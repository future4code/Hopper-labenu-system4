import { Request, Response } from "express";
import { DocenteDatabase } from "../database/DocenteDatabase";


export const createDocente = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
      const{id,nome,email,data_nasc,turma_id} = req.body

      if(!nome || !email ||! data_nasc || !turma_id ){
        errorCode = 422
        throw new Error("Preencha todas as informações");
        
      }
    const docenteDatabase = new DocenteDatabase()
    const findDocente = await docenteDatabase.findDocente(id)

    if(findDocente.length === 0){
        errorCode = 404
        throw new Error("Usuário não encontrado");

           
    }
    res.status(200).send({message:"Usuário criado com sucesso"})
        
    } catch (error) {
        
    }
    
}