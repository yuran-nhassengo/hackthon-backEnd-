const express = require("express");
const router = express.Router();
const {
  createTurma,
  getTurmas,
  getTurmaById,
  updateTurma,
  deleteTurma,
  getAlunosByTurma,
  getQuantidadeTurmas
} = require("../controller/turma-controller");

const { authenticateToken,getTurmasPorProfessor } = require('../controller/professor-controller');

router.post("/turmas", createTurma);

router.get("/turmas", getTurmas);

router.get("/turmas/:id", getTurmaById);

router.put("/turmas/:id", updateTurma);

router.delete("/turmas/:id", deleteTurma);

router.get('/alunos/turma', getAlunosByTurma);

router.get('/quantidade-turmas', authenticateToken, getQuantidadeTurmas);

router.get('/turma-por-professor', authenticateToken, getTurmasPorProfessor);

module.exports = router;
