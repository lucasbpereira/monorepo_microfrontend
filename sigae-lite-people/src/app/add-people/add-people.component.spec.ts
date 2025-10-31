import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule, FormArray } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AddPeopleComponent } from './add-people.component';
import { SchoolsService } from '../shared/services/schools.service';
import { PeopleService } from '../people/people.service';
import { AddressService } from '../shared/services/address.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StepperModule } from 'primeng/stepper';
import { FloatLabelModule } from "primeng/floatlabel";
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';

// Mocks dos serviços
class MockSchoolsService {
  getSchoolsData() {
    return ['Escola Teste 1', 'Escola Teste 2'];
  }
}

class MockPeopleService {
  createPeople = jest.fn();
}

class MockAddressService {
  getAddressByCep = jest.fn();
}

describe('AddPeopleComponent', () => {
  let component: AddPeopleComponent;
  let fixture: ComponentFixture<AddPeopleComponent>;
  let mockSchoolsService: MockSchoolsService;
  let mockPeopleService: MockPeopleService;
  let mockAddressService: MockAddressService;

  beforeEach(async () => {
    // Resetar os mocks antes de cada teste
    jest.clearAllMocks();
    
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ButtonModule,
        StepperModule,
        ReactiveFormsModule,
        InputTextModule,
        FormsModule,
        FloatLabelModule,
        SelectModule,
        InputMaskModule,
        FieldsetModule,
        ToastModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: SchoolsService, useClass: MockSchoolsService },
        { provide: PeopleService, useClass: MockPeopleService },
        { provide: AddressService, useClass: MockAddressService },
        MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPeopleComponent);
    component = fixture.componentInstance;
    
    // Obter instâncias dos serviços mockados
    mockSchoolsService = TestBed.inject(SchoolsService) as unknown as MockSchoolsService;
    mockPeopleService = TestBed.inject(PeopleService) as unknown as MockPeopleService;
    mockAddressService = TestBed.inject(AddressService) as unknown as MockAddressService;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should initialize schools data', () => {
      // Verificar se o componente usa os dados do mock
      expect(component.schools).toEqual(['Escola Teste 1', 'Escola Teste 2']);
    });

    it('should initialize countries data', () => {
      expect(component.countries.length).toBe(10);
      expect(component.countries[0].name).toBe('Australia');
      expect(component.countries[1].code).toBe('BR');
    });

    it('should create register form with correct controls', () => {
      expect(component.registerDataForm.contains('name')).toBe(true);
      expect(component.registerDataForm.contains('socialName')).toBe(true);
      expect(component.registerDataForm.contains('cpf')).toBe(true);
      expect(component.registerDataForm.contains('cnpj')).toBe(true);
      expect(component.registerDataForm.contains('school')).toBe(true);
    });

    it('should create contact form with correct controls', () => {
      expect(component.contactDataForm.contains('email')).toBe(true);
      expect(component.contactDataForm.contains('telephones')).toBe(true);
    });

    it('should create address form with correct controls', () => {
      expect(component.addressDataForm.contains('address')).toBe(true);
      expect(component.addressDataForm.contains('city')).toBe(true);
      expect(component.addressDataForm.contains('cep')).toBe(true);
      expect(component.addressDataForm.contains('state')).toBe(true);
      expect(component.addressDataForm.contains('country')).toBe(true);
    });
  });

  describe('Form Validation', () => {
    it('should mark register form as invalid when required fields are empty', () => {
      component.registerDataForm.controls['name'].setValue('');
      component.registerDataForm.controls['school'].setValue('');
      
      expect(component.registerDataForm.valid).toBe(false);
    });

    it('should mark register form as valid when required fields are filled', () => {
      component.registerDataForm.controls['name'].setValue('Test Name');
      component.registerDataForm.controls['school'].setValue('Test School');
      
      expect(component.registerDataForm.valid).toBe(true);
    });

    it('should mark contact form as invalid when email is invalid', () => {
      component.contactDataForm.controls['email'].setValue('invalid-email');
      
      expect(component.contactDataForm.valid).toBe(false);
    });

    it('should mark contact form as valid when email is valid', () => {
      component.contactDataForm.controls['email'].setValue('test@example.com');
      // Forçar a validação do formulário
      component.contactDataForm.markAsDirty();
      component.contactDataForm.updateValueAndValidity();
      
      expect(component.contactDataForm.valid).toBe(true);
    });

    it('should mark address form as invalid when required fields are empty', () => {
      component.addressDataForm.controls['address'].setValue('');
      component.addressDataForm.controls['country'].setValue('');
      
      expect(component.addressDataForm.valid).toBe(false);
    });

    it('should mark address form as valid when required fields are filled', () => {
      component.addressDataForm.controls['address'].setValue('Test Address');
      component.addressDataForm.controls['country'].setValue('BR');
      
      expect(component.addressDataForm.valid).toBe(true);
    });
  });

  describe('Telephone Management', () => {
    it('should create a telephone field', () => {
      const telephoneField = component.createTelephoneField();
      expect(telephoneField.contains('number')).toBe(true);
    });

    it('should add a new telephone field', () => {
      const initialLength = component.telephones.length;
      component.addTelephone();
      expect(component.telephones.length).toBe(initialLength + 1);
    });

    it('should remove a telephone field', () => {
      // Adicionar um telefone extra para poder remover
      component.addTelephone();
      const initialLength = component.telephones.length;
      
      component.removeTelephone(0);
      expect(component.telephones.length).toBe(initialLength - 1);
    });

    it('should not remove the last telephone field', () => {
      // Remover todos os telefones até restar apenas um
      while (component.telephones.length > 1) {
        component.removeTelephone(component.telephones.length - 1);
      }
      
      const initialLength = component.telephones.length;
      component.removeTelephone(0);
      expect(component.telephones.length).toBe(initialLength);
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      // Preencher todos os formulários com dados válidos
      component.registerDataForm.controls['name'].setValue('Test Name');
      component.registerDataForm.controls['school'].setValue('Test School');
      
      component.contactDataForm.controls['email'].setValue('test@example.com');
      const telephones = component.contactDataForm.get('telephones') as FormArray;
      telephones.at(0).get('number')?.setValue('123456789');
      
      component.addressDataForm.controls['address'].setValue('Test Address');
      component.addressDataForm.controls['country'].setValue('BR');
    });

    it('should not submit if register form is invalid', () => {
      component.registerDataForm.controls['name'].setValue('');
      
      component.onSubmitPeopleForm();
      
      expect(mockPeopleService.createPeople).not.toHaveBeenCalled();
    });

    it('should not submit if contact form is invalid', () => {
      component.contactDataForm.controls['email'].setValue('invalid-email');
      
      component.onSubmitPeopleForm();
      
      expect(mockPeopleService.createPeople).not.toHaveBeenCalled();
    });

    it('should not submit if address form is invalid', () => {
      component.addressDataForm.controls['address'].setValue('');
      
      component.onSubmitPeopleForm();
      
      expect(mockPeopleService.createPeople).not.toHaveBeenCalled();
    });

    it('should submit form when all forms are valid', () => {
      const emitSpy = jest.spyOn(component.back, 'emit');
      
      component.onSubmitPeopleForm();
      
      expect(mockPeopleService.createPeople).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalled();
    });

    it('should set loading state during submission', () => {
      component.onSubmitPeopleForm();
      
      expect(component.isLoading).toBe(true);
      expect(component.errorMessage).toBeNull();
    });
  });

  describe('CEP Validation', () => {
    it('should validate valid CEP', () => {
      const validCep = '12345-678';
      expect(component['isValidCep'](validCep)).toBe(true);
    });

    it('should invalidate CEP with wrong format', () => {
      const invalidCep = '12345678';
      expect(component['isValidCep'](invalidCep)).toBe(false);
    });

    it('should invalidate empty CEP', () => {
      const emptyCep = '';
      expect(component['isValidCep'](emptyCep)).toBe(false);
    });

    it('should not fetch address if country is not Brazil', () => {
      component.addressDataForm.controls['country'].setValue('US');
      
      const event = { target: { value: '12345-678' } } as unknown as Event;
      component.getAddress(event);
      
      expect(mockAddressService.getAddressByCep).not.toHaveBeenCalled();
    });

    it('should not fetch address if CEP is invalid', () => {
      component.addressDataForm.controls['country'].setValue('BR');
      
      const event = { target: { value: '12345678' } } as unknown as Event;
      component.getAddress(event);
      
      expect(mockAddressService.getAddressByCep).not.toHaveBeenCalled();
    });

    it('should fetch address if CEP is valid and country is Brazil', () => {
      component.addressDataForm.controls['country'].setValue('BR');
      // Mock da função isValidCep para retornar true
      const isValidCepSpy = jest.spyOn(component as any, 'isValidCep').mockReturnValue(true);
      mockAddressService.getAddressByCep.mockReturnValue(of({}));
      
      const event = { target: { value: '12345-678' } } as unknown as Event;
      component.getAddress(event);
      
      expect(mockAddressService.getAddressByCep).toHaveBeenCalledWith('12345-678');
      
      // Restaurar o spy
      isValidCepSpy.mockRestore();
    });
  });

  describe('Address Population', () => {
    it('should populate address fields when address is found', () => {
      const address = {
        logradouro: 'Rua Teste',
        bairro: 'Bairro Teste',
        localidade: 'Cidade Teste',
        uf: 'TS'
      };
      
      component['populateAddressFields'](address);
      
      expect(component.addressDataForm.get('address')?.value).toBe('Rua Teste - Bairro Teste');
      expect(component.addressDataForm.get('city')?.value).toBe('Cidade Teste');
      expect(component.addressDataForm.get('state')?.value).toBe('TS');
    });

    it('should handle address not found', () => {
      const address = { erro: true };
      const handleAddressNotFoundSpy = jest.spyOn(component as any, 'handleAddressNotFound');
      
      component['populateAddressFields'](address);
      
      expect(handleAddressNotFoundSpy).toHaveBeenCalled();
    });
  });

  describe('Address Error Handling', () => {
    it('should handle address service error', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const messageService = TestBed.inject(MessageService);
      const messageServiceSpy = jest.spyOn(messageService, 'add');
      
      component['handleAddressError']();
      
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar endereço');
      expect(messageServiceSpy).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Erro',
        detail: 'Opa, parece que algo deu errado na busca ao CEP.'
      });
      
      consoleSpy.mockRestore();
    });

    it('should handle address not found', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const messageService = TestBed.inject(MessageService);
      const messageServiceSpy = jest.spyOn(messageService, 'add');
      
      component['handleAddressNotFound']();
      
      expect(consoleSpy).toHaveBeenCalledWith('CEP não encontrado');
      expect(messageServiceSpy).toHaveBeenCalledWith({
        severity: 'warn',
        summary: 'Alerta',
        detail: 'Não encontramos seu endereço, por favor preencha manualmente ou verifique o CEP'
      });
      
      consoleSpy.mockRestore();
    });
  });

  describe('Component Lifecycle', () => {
    it('should complete destroy subject on ngOnDestroy', () => {
      const nextSpy = jest.spyOn(component['destroy$'], 'next');
      const completeSpy = jest.spyOn(component['destroy$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('Event Handling', () => {
    it('should emit back event when onBack is called', () => {
      const emitSpy = jest.spyOn(component.back, 'emit');
      
      component.onBack();
      
      expect(emitSpy).toHaveBeenCalled();
    });
  });
});