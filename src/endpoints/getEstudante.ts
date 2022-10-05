import { Estudante } from "../models/Estudante";
import { Request, Response } from "express";
import { EstudanteDatabase } from "../database/EstudanteDatabase";

export const getEstudante = async (req: Request, res: Response) => {
  let errorCode = 400;
  try {
    const { nome } = req.body

    if (!nome) {
      errorCode = 422
      throw new Error("Passe as requisições corretamente");
    }

    const estudanteDatabase = new EstudanteDatabase();
    const result = await estudanteDatabase.getEstudante(nome);

    if (result.length <= 0) {
      errorCode = 404
      throw new Error("Usuário não encontrado");
    }

    res.status(200).send({ Estudante: result })
  } catch (error) {
    res.status(errorCode).send({
      message: error.message
    })
  }
}