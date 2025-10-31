import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntil, finalize, Observable, Subject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { User } from '../../shared/interfaces/User';
import { NgxCaptchaModule } from 'ngx-captcha';
import { environment } from '../../../environments/environment.development';
import {Toast} from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'sigae-lite-login',
  standalone: true,
  imports: [FloatLabelModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    Toast
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  loginForm: FormGroup;
  isAuthenticated$: Observable<boolean>;
  isLoading = false;
  errorMessage: string | null = null;
  @Output() loggedUser = new EventEmitter();

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      recaptcha: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value)
    if (this.loginForm.invalid) {
      return;
    }
    console.log("PASSOU")

    this.isLoading = true;
    this.errorMessage = null;
    const { email, senha } = this.loginForm.value;

    this.authService.login(email, senha).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (user: User) => {
        console.log(user)
        this.loggedUser.emit(user);
      },
      error: (err) => {
        console.error('ERRO NA CHAMADA DE LOGIN:', err);
        this.errorMessage = err.message || 'Ocorreu um erro no login.';
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
