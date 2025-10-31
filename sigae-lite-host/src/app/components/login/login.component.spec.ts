import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Toast } from 'primeng/toast';

// Mocks dos serviços
class MockAuthService {
  login = jest.fn();
  isAuthenticated$ = of(false);
}

class MockRouter {
  navigate = jest.fn();
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: MockAuthService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    // Resetar os mocks antes de cada teste
    jest.clearAllMocks();
    
    await TestBed.configureTestingModule({
      imports: [
        FloatLabelModule,
        InputTextModule,
        FormsModule,
        ButtonModule,
        PasswordModule,
        ReactiveFormsModule,
        NgxCaptchaModule,
        Toast,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
        MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    
    // Obter instâncias dos serviços mockados
    mockAuthService = TestBed.inject(AuthService) as unknown as MockAuthService;
    mockRouter = TestBed.inject(Router) as unknown as MockRouter;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should create login form with correct controls', () => {
      expect(component.loginForm.contains('email')).toBe(true);
      expect(component.loginForm.contains('senha')).toBe(true);
      expect(component.loginForm.contains('recaptcha')).toBe(true);
    });

    it('should mark form as invalid when required fields are empty', () => {
      component.loginForm.controls['email'].setValue('');
      component.loginForm.controls['senha'].setValue('');
      component.loginForm.controls['recaptcha'].setValue('');
      
      expect(component.loginForm.valid).toBe(false);
    });

    it('should mark form as invalid when email is invalid', () => {
      component.loginForm.controls['email'].setValue('invalid-email');
      component.loginForm.controls['senha'].setValue('123456');
      component.loginForm.controls['recaptcha'].setValue('test-recaptcha');
      
      expect(component.loginForm.valid).toBe(false);
    });

    it('should mark form as valid when all fields are filled correctly', () => {
      component.loginForm.controls['email'].setValue('test@example.com');
      component.loginForm.controls['senha'].setValue('123456');
      component.loginForm.controls['recaptcha'].setValue('test-recaptcha');
      
      expect(component.loginForm.valid).toBe(true);
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      // Preencher o formulário com dados válidos
      component.loginForm.controls['email'].setValue('admin@sigae.com.br');
      component.loginForm.controls['senha'].setValue('123456');
      component.loginForm.controls['recaptcha'].setValue('test-recaptcha');
    });

    it('should not submit if form is invalid', () => {
      component.loginForm.controls['email'].setValue('');
      
      component.onSubmit();
      
      expect(mockAuthService.login).not.toHaveBeenCalled();
    });

    it('should submit form when all fields are valid', () => {
      const mockUser = { id: '1', name: 'Test User', email: 'admin@sigae.com.br' };
      mockAuthService.login.mockReturnValue(of(mockUser));
      const emitSpy = jest.spyOn(component.loggedUser, 'emit');
      
      component.onSubmit();
      
      expect(mockAuthService.login).toHaveBeenCalledWith('admin@sigae.com.br', '123456');
      expect(emitSpy).toHaveBeenCalledWith(mockUser);
    });

    it('should handle login error', () => {
      const error = new Error('Credenciais inválidas');
      mockAuthService.login.mockReturnValue(throwError(() => error));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      component.onSubmit();
      
      // Verificar se a mensagem de erro foi definida
      expect(component.errorMessage).toBe('Credenciais inválidas');
      expect(consoleSpy).toHaveBeenCalledWith('ERRO NA CHAMADA DE LOGIN:', error);
      consoleSpy.mockRestore();
    });

    it('should reset loading state after successful submission', () => {
      const mockUser = { id: '1', name: 'Test User', email: 'admin@sigae.com.br' };
      mockAuthService.login.mockReturnValue(of(mockUser));
      
      component.onSubmit();
      
      // Verificar se o estado de carregamento foi resetado
      expect(component.isLoading).toBe(false);
    });

    it('should reset loading state after failed submission', () => {
      const error = new Error('Credenciais inválidas');
      mockAuthService.login.mockReturnValue(throwError(() => error));
      
      component.onSubmit();
      
      // Verificar se o estado de carregamento foi resetado
      expect(component.isLoading).toBe(false);
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
});