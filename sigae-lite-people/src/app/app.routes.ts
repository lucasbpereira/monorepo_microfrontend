import {  Routes } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { AddPeopleComponent } from './add-people/add-people.component';

export const routes: Routes = [
  {
    path: '',
    component: PeopleComponent
  },
  {
    path: 'add',
    component: AddPeopleComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
