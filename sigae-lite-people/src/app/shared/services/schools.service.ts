import { Injectable } from '@angular/core';

@Injectable()
export class SchoolsService {

  constructor() { }

      getSchoolsData(): string[] {
          return [
            "Colégio Tiradentes",
            "E.E. Novo Amanhecer",
            "Colégio Albert Einstein",
            "E.E. Dom Pedro II",
            "Escola Municipal Tiradentes",
            "Instituto Duque de Caxias",
            "Liceu Castro Alves",
            "Colégio Estadual Monteiro Lobato",
            "Liceu Machado de Assis",
            "Instituto Santos Dumont",
            "Colégio Estadual Tiradentes",
            "Instituto Novo Amanhecer",
            "Colégio do Saber",
            "E.E. Machado de Assis",
            "Liceu Monteiro Lobato",
            "Colégio Dom Pedro II",
            "Escola Municipal do Saber",
            "Colégio Estadual Castro Alves",
            "Liceu Tiradentes",
            "Escola Municipal Castro Alves",
            "Colégio Estadual Santos Dumont",
            "Colégio Machado de Assis"
          ]
      }
}
