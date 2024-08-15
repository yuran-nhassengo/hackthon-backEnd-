const express = require('express');
const router = express.Router();
const alunoController = require('../controller/aluno-controller');

const  {getAlunosPorTurma,getAlunosPorTurmaPr, createAluno,getAlunos,getAlunoById,updateAluno,deleteAluno}= require('../controller/aluno-controller');

router.post('/alunos', createAluno);


router.get('/alunos',getAlunos);


router.get('/alunos/:id',getAlunoById);

router.put('/alunos/:id',updateAluno);


router.delete('/alunos/:id',deleteAluno);

router.get('/alunos/turma/:idTurma',getAlunosPorTurma);

router.get('/alunos-por-turma',getAlunosPorTurmaPr);

module.exports = router;