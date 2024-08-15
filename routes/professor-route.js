const express = require('express');
const router = express.Router();
const { createProfessor, getProfessores,
     getProfessorById, updateProfessor,getQuantidadeClassesPorProfessor,
      deleteProfessor } = require('../controller/professor-controller');


router.post('/professores', createProfessor);


router.get('/professores', getProfessores);


router.get('/professores/:id', getProfessorById);


router.put('/professores/:id', updateProfessor);


router.delete('/professores/:id', deleteProfessor);

router.get('/quantidade-classes', getQuantidadeClassesPorProfessor);

module.exports = router;
