import { Request,Response } from "express";
import { DocenteDatabase} from "../database/DocenteDatabase";


export const getDocente = async(req:Request, res:Response)=>{
let errorCode = 400

try {
    const docenteDatabase = new DocenteDatabase()
    const result = await docenteDatabase.getDocente()

    res.status(200).send({Docente:result})
    
} catch (error) {
  res.status(errorCode).send({message:error.message})  
}
}