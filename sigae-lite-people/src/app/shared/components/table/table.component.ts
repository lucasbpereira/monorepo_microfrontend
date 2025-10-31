import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { People } from '../../interface/people';
import { PeopleService } from '../../../people/people.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'sigae-lite-table',
  standalone: true,
  imports: [TableModule, ToastModule, CommonModule, TagModule, SelectModule, ButtonModule, InputTextModule, FormsModule, ConfirmDialog, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
   people!: People[];
    
    
    clonedPeople: { [s: string]: People } = {};
    
    constructor(private peopleService: PeopleService, private messageService: MessageService, private confirmationService: ConfirmationService) {}
    
    ngOnInit() {
        this.peopleService.getPeopleMini().then((data) => {
            this.people = data;
        });
    }
    
    onRowEditInit(people: People) {
        this.clonedPeople[people.id as string] = { ...people };
    }
    
    onRowEditSave(people: People) {

    }
    
    onRowEditCancel(people: People, index: number) {
        this.people[index] = this.clonedPeople[people.id as string];
        delete this.clonedPeople[people.id as string];
    }
            
            
    deletePeople(people: People) {
        this.confirmationService.confirm({
            message: 'Você tem certeza que quer deletar ' + people.name + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Não',
                severity: 'secondary',
                variant: 'text'
            },
            acceptButtonProps: {
                severity: 'danger',
                label: 'Sim'
            },
            accept: () => {
                this.people = this.people.filter((val) => val.id !== people.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Pessoa deletada',
                    life: 3000
                });
            }
        });
    
    }
}
