import { Request,Response } from "express";
import { DocenteDatabase } from "../database/DocenteDatabase";


export const modifiedDocente = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
      const nome = req.body.nome
      const novaTurma = req.body.novaTurma

      if(!nome || !novaTurma ){
        errorCode = 422
        throw new Error("Preencha todas as informações");
        
      }
    const docenteDatabase = new DocenteDatabase()
    const result = await docenteDatabase.changeDocente(novaTurma)

    if(result === 0){
        throw new Error("Usuário não encontrado");
        
    }

    await docenteDatabase.changeDocente(novaTurma)


 
    res.status(200).send({message:"Turma modificada com sucesso"})
        
    } catch (error) {
       res.status(errorCode).send({message:error.message})
    }
}