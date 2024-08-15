const express = require('express');
const router = express.Router();
const {
  createProfessor,
  getProfessores,
  getProfessorById,
  updateProfessor,
  deleteProfessor,
  getQuantidadeClassesPorProfessor,
  getQuantidadeDisciplinasPorProfessor,
  login,
  authenticateToken
} = require('../controller/professor-controller');


router.post('/professores', createProfessor);


router.post('/login', login);


router.get('/professores', getProfessores);


router.get('/professores/:id', getProfessorById);


router.put('/professores/:id', authenticateToken, updateProfessor);


router.delete('/professores/:id', authenticateToken, deleteProfessor);


router.get('/quantidade-classes', authenticateToken, getQuantidadeClassesPorProfessor);


router.get('/quantidade-disciplinas', authenticateToken, getQuantidadeDisciplinasPorProfessor);

module.exports = router;
