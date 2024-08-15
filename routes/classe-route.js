const express = require('express');
const router = express.Router();
const { createClasse, updateClasse, getClasses, getClasseById, deleteClasse,getDisciplinasPorClasse } = require('../controller/classe-controller');


router.post('/classes', createClasse);


router.put('/classes/:id', updateClasse);


router.get('/classes', getClasses);


router.get('/classes/:id', getClasseById);


router.delete('/classes/:id', deleteClasse);

router.get('/:id/disciplinas', getDisciplinasPorClasse);

module.exports = router;
