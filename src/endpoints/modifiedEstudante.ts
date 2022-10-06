import { Request,Response } from "express";
import { EstudanteDatabase } from "../database/EstudanteDatabase";

export const modifiedEstudante = async (req: Request, res: Response) =>{
  let errorCode = 400;
  try {
    const { nome,novaTurma } = req.body

    if (!nome || !novaTurma) {
      errorCode = 422
      throw new Error("Passe as requisições corretamente");
    }

    const estudanteDatabase = new EstudanteDatabase();
    const result = await estudanteDatabase.turma(novaTurma)

    if (result.length <= 0) {
      errorCode = 404
      throw new Error("Turma não encontrado");
    }
    await estudanteDatabase.putEstudante(nome,novaTurma)

    res.status(201).send({  message:"Turma Atualizada" })
  } catch (error) {
    res.status(errorCode).send({
      message:error.message
    })
  }
}