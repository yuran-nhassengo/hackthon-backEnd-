const express = require("express");
const router = express.Router();
const {createTurma,getTurmas,getTurmaById,updateTurma,deleteTurma} = require("../controller/turma-controller");

router.post("/turmas", createTurma);

router.get("/turmas", getTurmas);

router.get("/turmas/:id", getTurmaById);

router.put("/turmas/:id", updateTurma);

router.delete("/turmas/:id", deleteTurma);

module.exports = router;
