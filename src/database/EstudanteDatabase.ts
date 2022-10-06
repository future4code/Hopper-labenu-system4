import { Estudante_hobby } from "../models/Estudante_Hobby";
import { Hobby } from "../models/Hobby";
import { Pessoa } from "../models/Pessoa";
import BaseDataBase from "./BaseDataBase";

export class EstudanteDatabase extends BaseDataBase {
  public static TABLE_ESTUDANTE = "ESTUDANTE"
  public static TABLE_HOBBY = "HOBBY";
  public static TABLE_ESTUDANTE_HOBBY = "ESTUDANTE_HOBBY"
  public static TABLE_TURMA = "TURMA"

  // ------------------CRIAR ESTUDANTE-----------------------
  public async hobbies() {
    const result = await BaseDataBase.connection(EstudanteDatabase.TABLE_HOBBY)
    return result
  }

  public async createHobbies(hobbies: Hobby) {
    await BaseDataBase.connection(EstudanteDatabase.TABLE_HOBBY)
      .insert({
        id: hobbies.getId(),
        nome: hobbies.getNome()
      })
  }

  public async filterHobbiesId(nome: string) {
    const result = await BaseDataBase.connection(EstudanteDatabase.TABLE_HOBBY)
      .select("id")
      .where("nome", "=", nome)

    return result
  }

  public async createEstudanteHobby(estudante: Estudante_hobby) {
    await BaseDataBase.connection(EstudanteDatabase.TABLE_ESTUDANTE_HOBBY)
      .insert({
        id: estudante.getId(),
        estudante_id: estudante.getEstudanteId(),
        hobby_id: estudante.getHobbyId()
      })
  }

  public async createEstudante(estudante: Pessoa) {
    await BaseDataBase.connection(EstudanteDatabase.TABLE_ESTUDANTE)
      .insert({
        id: estudante.getId(),
        nome: estudante.getNome(),
        email: estudante.getEmail(),
        data_nasc: estudante.getDataNasc(),
        turma_id: estudante.getTurmaId()
      });
  }

  // ------------------BUSCA ESTUDANTE-----------------------
  public async getEstudante(nomeDoEstudante:string){
    const result = await BaseDataBase.connection(EstudanteDatabase.TABLE_ESTUDANTE)
      .where("nome", "=", nomeDoEstudante)
    return result
  }

  // ------------------MUDAR ESTUDANTE DE TURMA-----------------------
  public async turma(turma_id:string){
    const result = BaseDataBase.connection(EstudanteDatabase.TABLE_TURMA)
      .where("id", "=", turma_id)
    return result
  }

  public async putEstudante(estudante:string,novaTurma:string){
    await BaseDataBase.connection(EstudanteDatabase.TABLE_ESTUDANTE)
      .update("turma_id", novaTurma)
      .where("nome", "=", estudante)
  }

}