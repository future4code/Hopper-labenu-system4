export class Estudante_hobby {
  constructor(
    private id: string,
    private estudante_id: string,
    private hobby_id: string
  ){}

  public getId():string{
    return this.id
  }

  public getEstudanteId():string{
    return this.estudante_id
  }

  public getHobbyId():string{
    return this.hobby_id
  }
}