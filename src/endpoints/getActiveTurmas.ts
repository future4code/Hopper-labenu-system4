import { TurmaDataBase } from "../database/TurmaDataBase";
import { Request, Response } from "express";

export const getActiveTurmas= async (req: Request, res: Response) => {
  let errorCode = 400;
  try {
    const turmaDataBase = new TurmaDataBase();
    const result = await turmaDataBase.getActiveTurmas();

    if (result.length === 0) {
      throw new Error("Nao existem turmas activas");
    }
    res.status(200).send({ turmas: result });
  } catch (error: any) {
    res.status(errorCode).send({message: error.message});
  }
};
