import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

@Injectable()
export class AddressService {
  constructor(private http: HttpClient) { }

  getAddressByCep(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`).pipe(
      map(address => {
        if (address && (address as any).erro) {
          throw new Error('CEP não encontrado');
        }
        return address;
      }),
      catchError(error => {
        throw new Error('Erro ao buscar endereço');
      })
    );
  }
}
