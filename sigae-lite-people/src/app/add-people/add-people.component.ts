import { Component, Output, EventEmitter, OnInit, OnDestroy, importProvidersFrom } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StepperModule } from 'primeng/stepper';
import { FloatLabelModule } from "primeng/floatlabel"
import { SchoolsService } from '../shared/services/schools.service';
import { SelectModule } from 'primeng/select';
import { InputMask } from 'primeng/inputmask';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { Countries } from '../shared/interface/countries';
import { PeopleService } from '../people/people.service';
import { People } from '../shared/interface/people';
import { AddressService } from '../shared/services/address.service';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'sigae-lite-add-people',
  standalone: true,
  imports: [ CommonModule, ButtonModule, StepperModule, ReactiveFormsModule, InputTextModule, FormsModule, FloatLabelModule, SelectModule, InputMask, FieldsetModule, Toast],
  templateUrl: './add-people.component.html',
  styleUrl: './add-people.component.scss',
  providers: [
    SchoolsService, 
    AddressService,
    MessageService
  ]
})
export class AddPeopleComponent implements OnInit, OnDestroy {

  @Output() back = new EventEmitter<void>();
  
  registerDataForm: FormGroup;
  contactDataForm: FormGroup;
  addressDataForm: FormGroup;

  isLoading = false;
  errorMessage: string | null = null;

  schools!: string[];
  countries!: Countries[];
  selectedCountry!: string;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private schoolsService: SchoolsService, private peopleService: PeopleService, private addressService: AddressService, private messageService: MessageService) {
    this.registerDataForm = this.fb.group({
      name: ['', [Validators.required]],
      socialName: [''],
      cpf: [''],
      cnpj: [''],
      school: ['', [Validators.required]],
    });
    this.contactDataForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telephones: this.fb.array([this.createTelephoneField()], Validators.required)
    });
    this.addressDataForm = this.fb.group({
      address: ['', [Validators.required]],
      city: [''],
      cep: [''],
      state: [''],
      country: ['', [Validators.required]],
    });

  }
  
  ngOnInit(): void {
    this.schools = this.schoolsService.getSchoolsData();
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];
  }

  get telephones(): FormArray {
    return this.contactDataForm.get('telephones') as FormArray;
  }

  createTelephoneField(): FormGroup {
    return this.fb.group({
      number: ['', [Validators.required]]
    });
  }

  onBack() {
    this.back.emit();
  }

  onSubmitPeopleForm() {
    if (this.registerDataForm.invalid) {
      return;
    }
     if (this.contactDataForm.invalid) {
      return;
    }
     if (this.addressDataForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;
    const { 
      name,
      socialName,
      cpf,
      cnpj,
      school
    } = this.registerDataForm.value;
    const { 
      email,
      telephones
    } = this.contactDataForm.value;
    const { 
      address,
      city,
      cep,
      state,
      country
    } = this.addressDataForm.value;

    const people: People = {
      name,
      socialName,
      cpf,
      cnpj,
      school,
      email,
      telephones,
      address,
      city,
      cep,
      state,
      country
    }

    this.peopleService.createPeople(people);
    this.onBack();
  }

  addTelephone(): void {
    this.telephones.push(this.createTelephoneField());
  }

  removeTelephone(index: number): void {
    if (this.telephones.length > 1) {
      this.telephones.removeAt(index);
    }
  }

  getAddress(event: Event): void {
    if(this.addressDataForm.get('country')?.value !== 'BR') {return}
    const input = event.target as HTMLInputElement;
    const cep = input.value;

    if (this.isValidCep(cep)) {
      this.addressService.getAddressByCep(cep)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (address) => this.populateAddressFields(address),
          error: (error) => this.handleAddressError()
        });
    }
  }

  private isValidCep(cep: string): boolean {
    if (!cep || cep.length < 9) return false;
    const cleanCep = cep.replace(/\D/g, '');

    return cleanCep.length === 8;
  }

  private populateAddressFields(address: any): void {
    if (address && !address.erro) {
      // Atualize outros campos do formulário com os dados do endereço
      this.addressDataForm.patchValue({
        address: `${address.logradouro} - ${address.bairro}`,
        city: address.localidade,
        state: address.uf
      }, { emitEvent: false }); // emitEvent: false para evitar loops
    } else {
      this.handleAddressNotFound();
    }
  }


  private handleAddressError(): void {
    console.error('Erro ao buscar endereço');
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Opa, parece que algo deu errado na busca ao CEP.' });
  }

  private handleAddressNotFound(): void {
    console.warn('CEP não encontrado');
    this.messageService.add({ severity: 'warn', summary: 'Alerta', detail: 'Não encontramos seu endereço, porfavor preencha manualmente ou verifique o CEP' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}