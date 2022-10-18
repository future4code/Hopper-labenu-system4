import { Turma } from './../models/Turma';
import { TurmaDataBase } from "../database/TurmaDataBase";
import { Request, Response } from "express";

export const modifiedModulo = async (req: Request, res: Response) => {
  let errorCode = 400;
  try {
    const id = req.params.id as string;
    const modulo = req.body.modulo as number;

    if (!modulo) {
      errorCode = 422;
      throw new Error("Falta passar a informação do modulo.");
    }

    if (modulo < 0 || modulo > 6) {
      errorCode = 422;
      throw new Error("Os modulos sao do 0 ao 6.");
    }

    const turmaDataBase = new TurmaDataBase();
    const result = await turmaDataBase.getTurmaById(id)

    if (result.length <= 0) {
      errorCode = 404
      throw new Error("Turma não encontrada");
    }

    await turmaDataBase.modifiedModulo(id, modulo);

    res.status(200).send({message: "Modulo alterado."});
  } catch (error: any) {
    res.status(errorCode).send({ message: error.message });
  }
};
