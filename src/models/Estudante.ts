import { Pessoa } from './Pessoa';
export type TEstudante = {
    id: string,
    nome: string,
    email: string,
    data_nasc: Date,
    turma_id: string,
    hobbies: string[]
}
export class Estudante extends Pessoa {
    constructor(
        id: string,
        nome: string,
        email: string,
        data_nasc: Date,
        turma_id: string,
        private hobbies: string
    ) {
        super(
            id,
            nome,
            email,
            data_nasc,
            turma_id
        )
    }

    public getHobbie(): string {
        return this.hobbies
    }
}