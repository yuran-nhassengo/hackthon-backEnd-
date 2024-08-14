const express = require('express');
const router = express.Router();
const { createProfessor, getProfessores, getProfessorById, updateProfessor, deleteProfessor } = require('./professor-controller');


router.post('/professores', createProfessor);


router.get('/professores', getProfessores);


router.get('/professores/:id', getProfessorById);


router.put('/professores/:id', updateProfessor);


router.delete('/professores/:id', deleteProfessor);

module.exports = router;
