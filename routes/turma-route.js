const express = require("express");
const router = express.Router();
const {createTurma,getTurmas,getTurmaById,updateTurma,deleteTurma} = require("../controller/turma-controller");

const {getAlunosByTurma,getQuantidadeTurmas} = require('../controller/turma-controller');


router.post("/turmas", createTurma);

router.get("/turmas", getTurmas);

router.get("/turmas/:id", getTurmaById);

router.put("/turmas/:id", updateTurma);

router.delete("/turmas/:id", deleteTurma);

router.get('/alunos/turma', getAlunosByTurma);


router.get('/quantidade-turmas', getQuantidadeTurmas);

module.exports = router;
