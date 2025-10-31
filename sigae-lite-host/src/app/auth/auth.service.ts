import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../shared/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();

  public isAuthenticated$: Observable<boolean>;

  constructor(private router: Router) {
    this.isAuthenticated$ = this.currentUser$.pipe(
      map(user => !!user) 
    );

    this.loadInitialUser();
  }


  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

login(email: string, password: string): Observable<User> {
  if (email === 'admin@sigae.com.br' && password === '123456') {
    const mockUser: User = {
      id: '1',
      name: 'Usuário Teste',
      email: 'admin@sigae.com.br'
    };

    return of(mockUser).pipe(
      delay(1000),
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  } else {
    return of(null).pipe(
      delay(500), 
      switchMap(() => {
        return throwError(() => new Error('Credenciais inválidas'));
      })
    );
  }
}


  logout(): void {
    localStorage.removeItem('currentUser');
    
    this.currentUserSubject.next(null);
    
    this.router.navigate(['/login']);
  }

  private loadInitialUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error("Erro ao parsear usuário do localStorage", e);
        localStorage.removeItem('currentUser');
      }
    }
  }
}