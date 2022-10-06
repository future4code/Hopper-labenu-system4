import BaseDataBase from "./BaseDataBase";
import { Docente } from "../models/Docente";



export class DocenteDatabase extends BaseDataBase {
    public static TABLE_DOCENTE = "DOCENTE"


    public async createDocente(especialidades: Docente) {
        await BaseDataBase.connection(DocenteDatabase.TABLE_DOCENTE).insert({
            id: especialidades.getId(),
            nome: especialidades.getNome(),
            email: especialidades.getEmail(),
            data_nasc: especialidades.getDataNasc(),
          
        })
    }

    public async getDocente() {
        const result = await BaseDataBase.connection(DocenteDatabase.TABLE_DOCENTE)
        return result
    }

    public async findDocente(id:string) {
        const result = await BaseDataBase.connection(DocenteDatabase.TABLE_DOCENTE)
        .select()
        .where({id})
        
        return result
     }

     public async changeDocente(id:string){
        const result = await BaseDataBase.connection(DocenteDatabase.TABLE_DOCENTE)
        .select()
        .update({id})

        return result
     }

}