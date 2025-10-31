import { Injectable } from '@angular/core';
import { People } from '../shared/interface/people';

@Injectable()
export class PeopleService {

    peopleData: People[] = [
          {
              "id": "16443adf-4c17-4523-8a65-fcd8f4483808",
              "name": "Gabriel Fernandes",
              "cpf": "468.629.267-05",
              "email": "gabriel.fernandes82@sigae.com.br",
              "school": "Colégio Tiradentes",
              "address": "Brasília - AM"
          },
          {
              "id": "3a736382-2d4a-4e9a-8df5-e267cb6636d9",
              "name": "Rafael Oliveira",
              "cpf": "627.300.417-02",
              "email": "rafael.oliveira78@sigae.com.br",
              "school": "E.E. Novo Amanhecer",
              "address": "Curitiba - PR"
          },
          {
              "id": "2460c763-b66d-4be7-9b21-7e7f15f8cb22",
              "name": "Enzo Melo",
              "cpf": "200.290.238-07",
              "email": "enzo.melo26@sigae.com.br",
              "school": "Colégio Albert Einstein",
              "address": "São João de Meriti - PE"
          },
          {
              "id": "83e4a0f5-07a5-4894-b900-3c32adc8c9e5",
              "name": "Enzo Alves",
              "cpf": "297.180.915-30",
              "email": "enzo.alves13@sigae.com.br",
              "school": "Colégio Tiradentes",
              "address": "Belford Roxo - SP"
          },
          {
              "id": "a4bd91eb-e8b2-4a1d-931f-0e074254974f",
              "name": "Larissa Fernandes",
              "cpf": "525.230.405-06",
              "email": "larissa.fernandes88@sigae.com.br",
              "school": "E.E. Dom Pedro II",
              "address": "Fortaleza - CE"
          },
          {
              "id": "a5d765e4-0d8b-4ba6-83bb-e42541c09e4c",
              "name": "Giovanna Martins",
              "cpf": "049.740.969-07",
              "email": "giovanna.martins66@sigae.com.br",
              "school": "Escola Municipal Tiradentes",
              "address": "Curitiba - ES"
          },
          {
              "id": "582d9bf1-7bb8-472e-ad99-11a4ec940f54",
              "name": "Leonardo Ferreira",
              "cpf": "680.644.704-04",
              "email": "leonardo.ferreira98@sigae.com.br",
              "school": "Instituto Duque de Caxias",
              "address": "Nova Iguaçu - GO"
          },
          {
              "id": "4c4fa980-3466-4dd4-866c-bfb73ae6c732",
              "name": "Lucas Almeida",
              "cpf": "250.670.838-32",
              "email": "lucas.almeida88@sigae.com.br",
              "school": "Liceu Castro Alves",
              "address": "Duque de Caxias - CE"
          },
          {
              "id": "ea36b147-92e3-4b7e-a1ec-e30b17ff11dc",
              "name": "Matheus Silva",
              "cpf": "757.332.104-00",
              "email": "matheus.silva74@sigae.com.br",
              "school": "Colégio Estadual Monteiro Lobato",
              "address": "Recife - SC"
          },
          {
              "id": "9cd22ab0-e7e4-4a6f-8eb8-de0412f6d771",
              "name": "Rafael Martins",
              "cpf": "729.739.594-38",
              "email": "rafael.martins27@sigae.com.br",
              "school": "Liceu Machado de Assis",
              "address": "Recife - CE"
          },
          {
              "id": "7cb9fed9-92be-43d6-889e-b77d2069c826",
              "name": "Isabella Santos",
              "cpf": "090.513.326-96",
              "email": "isabella.santos73@sigae.com.br",
              "school": "Instituto Santos Dumont",
              "address": "Campos dos Goytacazes - BA"
          },
          {
              "id": "ade9c09b-5b5e-4b3a-bfd4-31b57640e7fa",
              "name": "Manuela Carvalho",
              "cpf": "349.311.383-81",
              "email": "manuela.carvalho69@sigae.com.br",
              "school": "Colégio Estadual Tiradentes",
              "address": "Campos dos Goytacazes - ES"
          },
          {
              "id": "3fe40130-9dd1-417c-aace-cb81c48de9e0",
              "name": "Isabella Martins",
              "cpf": "919.945.173-52",
              "email": "isabella.martins97@sigae.com.br",
              "school": "Instituto Novo Amanhecer",
              "address": "Niterói - SC"
          },
          {
              "id": "bbdc784d-2d05-4116-84a5-552383bffb89",
              "name": "Laura Barbosa",
              "cpf": "997.305.889-53",
              "email": "laura.barbosa49@sigae.com.br",
              "school": "Colégio do Saber",
              "address": "Brasília - SP"
          },
          {
              "id": "9b917179-b8f8-4cdc-a9e3-a3f2d709df80",
              "name": "Alice Araújo",
              "cpf": "341.166.102-08",
              "email": "alice.araújo9@sigae.com.br",
              "school": "Escola Municipal Tiradentes",
              "address": "Porto Alegre - ES"
          },
          {
              "id": "3999241d-4d0f-4669-8510-a837e3041bcd",
              "name": "Mariana Carvalho",
              "cpf": "298.687.933-00",
              "email": "mariana.carvalho97@sigae.com.br",
              "school": "Instituto Novo Amanhecer",
              "address": "Porto Alegre - AM"
          },
          {
              "id": "ba226367-6221-4da6-b7ee-f59b39a9b05e",
              "name": "Manuela Pereira",
              "cpf": "745.389.482-41",
              "email": "manuela.pereira73@sigae.com.br",
              "school": "E.E. Machado de Assis",
              "address": "Nova Iguaçu - MG"
          },
          {
              "id": "e37f5b91-21e1-40c3-92b0-23dad880913c",
              "name": "Lucas Pereira",
              "cpf": "039.035.280-21",
              "email": "lucas.pereira95@sigae.com.br",
              "school": "Liceu Castro Alves",
              "address": "Rio de Janeiro - ES"
          },
          {
              "id": "bfa584ea-8df1-4ab2-b602-93f24f9215eb",
              "name": "Beatriz Oliveira",
              "cpf": "746.408.055-60",
              "email": "beatriz.oliveira28@sigae.com.br",
              "school": "Liceu Monteiro Lobato",
              "address": "Duque de Caxias - SP"
          },
          {
              "id": "f7c2a858-6173-4b37-b1a4-749103137b9f",
              "name": "Valentina Ferreira",
              "cpf": "520.637.611-67",
              "email": "valentina.ferreira31@sigae.com.br",
              "school": "Colégio Dom Pedro II",
              "address": "São João de Meriti - CE"
          },
          {
              "id": "7befcfe5-cac3-41f7-9b9b-992521c89712",
              "name": "Ana Araújo",
              "cpf": "275.967.659-55",
              "email": "ana.araújo12@sigae.com.br",
              "school": "Escola Municipal do Saber",
              "address": "Brasília - PE"
          },
          {
              "id": "56010c28-9c49-48d4-94f7-e8cdfd055207",
              "name": "Felipe Gomes",
              "cpf": "876.220.806-32",
              "email": "felipe.gomes62@sigae.com.br",
              "school": "Colégio Estadual Castro Alves",
              "address": "Belford Roxo - SC"
          },
          {
              "id": "759a4693-949c-4a0d-a824-57954ebfdcca",
              "name": "Nicolas Santos",
              "cpf": "352.671.446-06",
              "email": "nicolas.santos44@sigae.com.br",
              "school": "Liceu Tiradentes",
              "address": "Rio de Janeiro - DF"
          },
          {
              "id": "f744e850-12ff-45fe-8e21-b19b361bb7e9",
              "name": "Valentina Fernandes",
              "cpf": "934.596.994-26",
              "email": "valentina.fernandes72@sigae.com.br",
              "school": "Escola Municipal Tiradentes",
              "address": "Niterói - BA"
          },
          {
              "id": "eaf56503-05cb-4031-92a1-78bf17205a37",
              "name": "Pedro Almeida",
              "cpf": "646.096.926-43",
              "email": "pedro.almeida9@sigae.com.br",
              "school": "E.E. Machado de Assis",
              "address": "Porto Alegre - SP"
          },
          {
              "id": "036ab3b3-3c85-4cf7-875d-4f55a2e507c4",
              "name": "Rafael Nunes",
              "cpf": "292.592.903-68",
              "email": "rafael.nunes20@sigae.com.br",
              "school": "Escola Municipal Castro Alves",
              "address": "Recife - PE"
          },
          {
              "id": "9bb986aa-43cb-4a6e-b351-8857d3db2ac6",
              "name": "Bruno Nunes",
              "cpf": "252.067.548-97",
              "email": "bruno.nunes36@sigae.com.br",
              "school": "Colégio Dom Pedro II",
              "address": "Manaus - BA"
          },
          {
              "id": "c66418af-e80f-40c3-8872-2fff8fcd53ef",
              "name": "Valentina Ferreira",
              "cpf": "174.408.318-53",
              "email": "valentina.ferreira78@sigae.com.br",
              "school": "Colégio Estadual Santos Dumont",
              "address": "Niterói - SP"
          },
          {
              "id": "afc7d8b4-a2c6-4ad0-a800-f9e38103c049",
              "name": "Felipe Martins",
              "cpf": "352.896.768-48",
              "email": "felipe.martins46@sigae.com.br",
              "school": "Colégio Machado de Assis",
              "address": "Porto Alegre - BA"
          },
          {
              "id": "7bb92096-8947-4b12-91a1-4ef0a7461efb",
              "name": "Gabriel Almeida",
              "cpf": "640.932.653-05",
              "email": "gabriel.almeida45@sigae.com.br",
              "school": "Instituto Duque de Caxias",
              "address": "Recife - BA"
          }
    ];

    getPeopleData(): People[] {
        return this.peopleData
    }

    getPeopleMini() {
        return Promise.resolve(this.getPeopleData().slice(0, 5));
    }

    createPeople(people: People) {
        people.id = this.generateMockUUID();
        this.peopleData.unshift(people);
    }


    generateMockUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}
