import { Estudante } from "../models/Estudante";
import { Request, Response } from "express";
import { EstudanteDatabase } from "../database/EstudanteDatabase";
import { Hobby } from "../models/Hobby";
import { Estudante_hobby } from "../models/Estudante_Hobby";

export const createEstudante = async (req: Request, res: Response) => {
  let errorCode = 400;
  try {
    const { nome, email, data_nasc, turma_id, hobbies } = req.body

    if (!nome || !email || !data_nasc || !turma_id || !hobbies) {
      errorCode = 422
      throw new Error("Passe as requisições corretamente");
    }

    //MUDAR A DATA PARA UMA QUE O BANCO DE DADOS ENTENDA (DATA AMERICANA)
    const data_nasc_americana = data_nasc.split("/").reverse().join("-")

    //MUDAR A STRING DE HOBBIES PARA UM ARRAY DE HOBBIES
    const arr_hobbies = hobbies.split(",")

    //ESTUDANTE DATABASE
    const estudanteDatabase = new EstudanteDatabase();
    //BUSCA TODOS OS HOBBIES EXISTENTE
    const result = await estudanteDatabase.hobbies();
    //MAPEAR APENAS OS NOMES DOS HOBBIES
    const todosOsHobbies = result.map((r: any) => r.nome)

    //CRIANDO UM ESTUDANTE
    const estudante = new Estudante(
      Date.now().toString(),
      nome,
      email,
      data_nasc_americana,
      turma_id,
      hobbies
    )
    //CRIANDO UM DADO NA ENTIDADE ESTUDANTE DO BD
    await estudanteDatabase.createEstudante(estudante)

    for (let i = 0; i < arr_hobbies.length; i++) {
      const element = todosOsHobbies.some((r: any) => arr_hobbies[i].includes(r))

      //VERIFICANDO O HOBBY DO ESTUDANTE NÃO EXISTE NA TABELA DE HOBBY DO BD
      if (!element) {
        // CRIANDO UM NOVO HOBBY
        const novoHobby = new Hobby(
          Date.now().toString(),
          arr_hobbies[i]
        )

        const estudante_hobby = new Estudante_hobby(
          Date.now().toString(),
          estudante.getId(),
          novoHobby.getId()
        )
        //CRIANDO UM NOVO DADO NA ENTIDADE HOBBY DO BD
        await estudanteDatabase.createHobbies(novoHobby)
        await estudanteDatabase.createEstudanteHobby(estudante_hobby)
      } else {
        //PUXANDO APENAS O ID DO HOBBY
        const id = await estudanteDatabase.filterHobbiesId(arr_hobbies[i])

        if (id.length > 0) {

          const estudante_hobby = new Estudante_hobby(
            Date.now().toString(),
            estudante.getId(),
            id.map((e:any) => e.id).shift()
          )

          await estudanteDatabase.createEstudanteHobby(estudante_hobby)
        }
      }
    }

    res.status(201).send({ message: "Estudante Criado Com Sucesso!" })
  } catch (error) {
    res.status(errorCode).send({
      message: error.message
    });
  }
}