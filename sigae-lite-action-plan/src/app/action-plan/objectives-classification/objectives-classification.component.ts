import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'sigae-lite-objectives-classification',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    FieldsetModule,
    InputTextModule,
    FloatLabelModule,
    CheckboxModule,
    SelectModule,
        TableModule,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './objectives-classification.component.html',
  styles: [`
    .full-width {
      width: 100%;
    }
    .half-width {
      width: 50%;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  `],
  providers:[MessageService, ConfirmationService]
})
export class ObjectivesClassificationComponent {
  @Input() classificationForm!: FormGroup;
  @Input() objectivesDescriptions: string[] = [];
  
  @Output() onPrevious = new EventEmitter<void>();
  @Output() onNext = new EventEmitter<void>();

  private clonedProblems: { [s: string]: any } = {};

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  get objectives(): FormArray {
    return this.classificationForm.get('objectives') as FormArray;
  }

  getProblems(objectiveIndex: number): FormArray {
    return this.objectives.at(objectiveIndex).get('problems') as FormArray;
  }

  getObjectiveDescription(index: number): string {
    const objective = this.objectives.at(index);
    return objective.get('objectiveDescription')?.value || `Objetivo ${index + 1}`;
  }

  addProblem(objectiveIndex: number): void {
    const problems = this.getProblems(objectiveIndex);
    const newProblem = this.createProblemForm();
    
    // Adiciona um ID único para cada problema para o dataKey da tabela
    const problemWithId = {
      ...newProblem.value,
      id: this.generateId()
    };
    
    problems.push(this.fb.group(problemWithId));
    
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Problema adicionado'
    });
  }

  confirmDeleteProblem(objectiveIndex: number, problemIndex: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este problema?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.removeProblem(objectiveIndex, problemIndex);
      }
    });
  }

  removeProblem(objectiveIndex: number, problemIndex: number): void {
    const problems = this.getProblems(objectiveIndex);
    if (problems.length > 1) {
      problems.removeAt(problemIndex);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Problema removido'
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'É necessário ter pelo menos um problema'
      });
    }
  }

  onRowEditInit(problem: any) {
    this.clonedProblems[problem.value.id] = { ...problem.value };
  }

  onRowEditSave(problem: any) {
    if (problem.valid) {
      delete this.clonedProblems[problem.value.id];
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Problema atualizado'
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos obrigatórios'
      });
    }
  }

  onRowEditCancel(problem: any, index: number) {
    const problemId = problem.value.id;
    if (this.clonedProblems[problemId]) {
      // Restaura os valores originais
      problem.patchValue(this.clonedProblems[problemId]);
      delete this.clonedProblems[problemId];
    }
  }

  private createProblemForm(): FormGroup {
    return this.fb.group({
      id: [this.generateId()],
      problemDescription: [''],
      stage: [''],
      hasCause: [false],
      result: [''],
      priority: [false],
      category: ['']
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}