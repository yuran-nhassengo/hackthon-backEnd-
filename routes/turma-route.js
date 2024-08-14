const express = require("express");
const router = express.Router();
const turmaController = require("../controllers/turmaController");

router.post("/turmas", turmaController.createTurma);

router.get("/turmas", turmaController.getTurmas);

router.get("/turmas/:id", turmaController.getTurmaById);

router.put("/turmas/:id", turmaController.updateTurma);

router.delete("/turmas/:id", turmaController.deleteTurma);

module.exports = router;
