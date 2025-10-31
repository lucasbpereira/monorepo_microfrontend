import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { PeopleService } from './people.service';
import { ButtonModule } from 'primeng/button';
import { TableComponent } from '../shared/components/table/table.component';
import { Router, RouterLink } from '@angular/router';
import { AddPeopleComponent } from '../add-people/add-people.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [ButtonModule, TableComponent, AddPeopleComponent, CommonModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
  providers: [MessageService, PeopleService, ConfirmationService]
})
export class PeopleComponent {

    showAddForm = false;

    constructor(private router: Router) {}

    navigateToAdd() {
        this.showAddForm = true;
    }
    
    hideAddForm() {
        this.showAddForm = false;
    }

    onBack(event: void) {
        this.showAddForm = false
    }
}