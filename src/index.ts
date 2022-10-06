// LUCIA
import { modifiedModulo } from './endpoints/modifiedModulo';
import { getActiveTurmas } from './endpoints/getActiveTurmas';
import { createTurma } from './endpoints/createTurma';

// MARIO
import { ping } from './endpoints/ping';
import { createEstudante } from './endpoints/createEstudante';
import { getEstudante } from './endpoints/getEstudante';
import { modifiedEstudante } from './endpoints/modifiedEstudante';

//ERICA
import app from "./app";
import { getDocente } from './endpoints/getDocente';
import { createDocente} from './endpoints/createDocente'
import { modifiedDocente } from './endpoints/modifiedDocente';

// LUCIA
app.post("/turma", createTurma)
app.get("/turma", getActiveTurmas)
app.put("/turma/:id", modifiedModulo)


//MARIO
app.get("/ping", ping)
app.get("/estudante", getEstudante)
app.post("/estudante", createEstudante)
app.put("/estudante", modifiedEstudante)

//ERICA 
app.get("/docente",getDocente)
app.post("/docente",createDocente)
app.put("/dpcente",modifiedDocente)
