export abstract class Pessoa {
  constructor(
    private id: string,
    private nome: string,
    private email: string,
    private data_nasc: Date,
    private turma_id: string
  ) {}

public getId(): string{
    return this.id
}

public getNome(): string{
    return this.nome
}

public getEmail(): string{
    return this.email
}

public getDataNasc(): Date{
    return this.data_nasc
}

public getTurmaId(): string{
    return this.turma_id
}

}
