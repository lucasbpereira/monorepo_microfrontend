import { Component, EventEmitter, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from "primeng/floatlabel"
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { AsyncPipe } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { User } from '../../shared/interfaces/User';

@Component({
  selector: 'sigae-lite-navbar',
  standalone: true,
  imports: [
    Dialog,
    Menubar,
    RouterLink,
    AsyncPipe,
    ButtonModule,
    LoginComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  visible: boolean = false;
  items: MenuItem[] | undefined;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Pessoas',
        icon: 'pi pi-user',
        url: '/people'
      },
      {
        label: 'Agenda',
        icon: 'pi pi-calendar',
        url: '/calendar'
      },
      {
        label: 'Plano de Ação',
        icon: 'pi pi-copy',
        url: '/action-plan'
      },
    ];
  }

  showLoginDialog() {
      this.visible = true;
  }

  logout() {
    this.authService.logout()
  }

  hideLoginDialog(event: User) {
    console.log(event)
    this.visible = false;
  }
}
