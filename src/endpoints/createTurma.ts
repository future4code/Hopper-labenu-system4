import { TurmaDataBase } from "../database/TurmaDataBase";
import { Turma } from "../models/Turma";
import { Request, Response } from "express";

export const createTurma = async (req: Request, res: Response) => {
  let errorCode = 400;
  try {
    const nome = req.body.nome;
    const modulo = 0;
    const id = Date.now().toString();

    if (!nome) {
      throw new Error("É necessário passar o nome da turma.");
    }

    const turma = new Turma(id, nome, modulo);
    const turmaDataBase = new TurmaDataBase();
    await turmaDataBase.createTurma(turma);

    res.status(201).send({ message: "Turma criada", turma: turma });
  } catch (error: any) {
    res.status(errorCode).send({message: error.message});
  }
};
