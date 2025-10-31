import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StepperModule } from 'primeng/stepper';
import { FloatLabelModule } from "primeng/floatlabel"
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { ObjectivesClassificationComponent } from './objectives-classification/objectives-classification.component';

@Component({
  selector: 'sigae-lite-action-plan',
  standalone: true,
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
    CheckboxModule,
    ObjectivesClassificationComponent
  ],
  templateUrl: './action-plan.component.html',
  styleUrl: './action-plan.component.scss',
  providers: [MessageService]
})
export class ActionPlanComponent {
  chooseObjectivesForm!: FormGroup;
  objectivesClassificationForm!: FormGroup;
  currentStep = 1;

  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.chooseObjectivesForm = this.fb.group({
      title: ['', [Validators.required]],
      objectives: this.fb.array([this.createObjectiveForm()], Validators.required)
    });

    this.objectivesClassificationForm = this.fb.group({
      objectives: this.fb.array([])
    });
  }
  
  get objectives(): FormArray {
    return this.chooseObjectivesForm.get('objectives') as FormArray;
  }

  get objectivesDescriptions(): string[] {
    return this.objectives.controls.map((control, index) => {
      const description = control.get('objectiveDescription')?.value;
      return description || `Objetivo ${index + 1}`;
    });
  }

  get selectedObjectives(): any[] {
    return this.objectives.controls
      .map((control, index) => ({
        index,
        description: control.get('objectiveDescription')?.value || `Objetivo ${index + 1}`,
        selected: control.get('objectiveFlag')?.value
      }))
      .filter(obj => obj.selected);
  }

  get classificationObjectives(): FormArray {
    return this.objectivesClassificationForm.get('objectives') as FormArray;
  }

  createObjectiveForm(): FormGroup {
    return this.fb.group({
      objectiveFlag: [false, [Validators.required]],
      objectiveDescription: ['']
    });
  }

  createClassificationObjectiveForm(description: string): FormGroup {
    return this.fb.group({
      objectiveDescription: [description],
      problemDescription: [''],
      stage: [''],
      hasCause: [false],
      problems: this.fb.array([this.createProblemForm()])
    });
  }

  createProblemForm(): FormGroup {
    return this.fb.group({
      problemDescription: [''],
      stage: [''],
      hasCause: [false],
      result: [''],
      priority: [false],
      category: ['']
    });
  }

  addObjective(): void {
    this.objectives.push(this.createObjectiveForm());
  }

  removeObjective(index: number): void {
    if (this.objectives.length > 1) {
      this.objectives.removeAt(index);
    }
  }

  onStepChange(step: number): void {
    this.currentStep = step;
    
    switch(step) {
      case 1:
        console.log('Navegando para: Escolha de Objetivos');
        break;
      case 2:
        console.log('Navegando para: Classificação de Objetivos');
        this.syncObjectives();
        break;
      case 3:
        console.log('Navegando para: Ações');
        break;
    }
  }

  onNextToStep2(): void {
    // Primeiro sincroniza os objetivos, depois muda para o step 2
    this.syncObjectives();
    this.currentStep = 2;
  }

  private syncObjectives(): void {
    console.log('Sincronizando objetivos...');
    console.log('Objetivos selecionados:', this.selectedObjectives);

    // Limpa o array atual
    while (this.classificationObjectives.length !== 0) {
      this.classificationObjectives.removeAt(0);
    }

    // Adiciona apenas os objetivos selecionados
    const selectedObjs = this.selectedObjectives;
    selectedObjs.forEach(obj => {
      console.log('Adicionando objetivo:', obj.description);
      this.classificationObjectives.push(this.createClassificationObjectiveForm(obj.description));
    });

    console.log('Objetivos no form de classificação:', this.classificationObjectives.length);
  }
}