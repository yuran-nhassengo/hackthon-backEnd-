const express = require('express');
const router = express.Router();
const alunoController = require('../controller/aluno-controller');

const  { createAluno,getAlunos,getAlunoById,updateAluno,deleteAluno}= require('../controller/aluno-controller');

router.post('/alunos', createAluno);


router.get('/alunos',getAlunos);


router.get('/alunos/:id',getAlunoById);

router.put('/alunos/:id',updateAluno);


router.delete('/alunos/:id',deleteAluno);

module.exports = router;