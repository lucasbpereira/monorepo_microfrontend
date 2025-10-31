import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'sigae-lite-navbar',
  standalone: true,
  imports: [
    Dialog,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
    Menubar,
    RouterLink,
    AsyncPipe
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  visible: boolean = false;
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  items: MenuItem[] | undefined;
  
  isAuthenticated$: Observable<boolean>;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
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

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;
    const { email, senha } = this.loginForm.value;

    this.authService.login(email, senha).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (user) => {
        this.visible = false
      },
      error: (err) => {
        this.errorMessage = err.message || 'Ocorreu um erro no login.';
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
