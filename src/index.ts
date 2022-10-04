import { modifiedModulo } from './endpoints/modifiedModulo';
import { getActiveTurmas } from './endpoints/getActiveTurmas';
import { createTurma } from './endpoints/createTurma';
import app from "./app";

app.post("/turma", createTurma)
app.get("/turma", getActiveTurmas)
app.put("/turma/:id", modifiedModulo)