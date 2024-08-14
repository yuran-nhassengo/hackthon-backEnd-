const express = require('express');
const router = express.Router();
const { createDisciplina, updateDisciplina, getDisciplinas, getDisciplinaById, deleteDisciplina } = require('../controller/disciplina-controller');


router.post('/disciplinas', createDisciplina);


router.put('/disciplinas/:id', updateDisciplina);


router.get('/disciplinas', getDisciplinas);


router.get('/disciplinas/:id', getDisciplinaById);


router.delete('/disciplinas/:id', deleteDisciplina);

module.exports = router;
