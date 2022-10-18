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

    const data_nasc_americana = result.map((e) => e.data_nasc).shift().toLocaleDateString()

    const resultFinal = result.map((e)=>{
      return {
        id: e.id,
        nome: e.nome,
        email: e.email,
        data_nasc: data_nasc_americana,
        turma_id: e.turma_id
      }
    })
    
    if (result.length <= 0) {
      errorCode = 404
      throw new Error("Usuário não encontrado");
    }

    res.status(200).send({ Estudante: resultFinal })
  } catch (error) {
    res.status(errorCode).send({
      message: error.message
    })
  }
}