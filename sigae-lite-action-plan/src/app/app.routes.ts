import { Routes } from '@angular/router';
import { ActionPlanComponent } from './action-plan/action-plan.component';

export const routes: Routes = [
  {
    path: '',
    component: ActionPlanComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
