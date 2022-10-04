import { Turma } from "../models/Turma";
import BaseDataBase from "./BaseDataBase";

export class TurmaDataBase extends BaseDataBase {
  public static TABLE_TURMA = "TURMA";

  public async createTurma(turma: Turma) {
    await BaseDataBase.connection(TurmaDataBase.TABLE_TURMA).insert({
      id: turma.getId(),
      nome: turma.getNome(),
      modulo: turma.getModulo(),
    });
  }

  public async getActiveTurmas() {
    const result = await BaseDataBase.connection(TurmaDataBase.TABLE_TURMA)
      .select()
      .where("modulo", "!=", "0");
      return result
  }

  public async modifiedModulo(id: string, modulo:number){
    await BaseDataBase.connection(TurmaDataBase.TABLE_TURMA).where(id).update({modulo: modulo})
  }
}
