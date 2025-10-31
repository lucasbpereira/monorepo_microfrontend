import { Telephone } from "./telephone";

export interface People {
    id?: string;
    name: string;
    socialName?: string;
    cpf?: string;
    cnpj?: string;
    school: string;
    email: string;
    telephones?: Telephone[];
    address: string;
    city?: string;
    cep?: string;
    state?: string;
    country?: string;
}