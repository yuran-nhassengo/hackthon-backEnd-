const express = require('express');
const router = express.Router();
const {createNota,getNotas,getNotaById,updateNota,deleteNota} = require('../controller/nota-controller');


router.post('/notas',createNota);


router.get('/notas',getNotas);


router.get('/notas/:id',getNotaById);


router.put('/notas/:id',updateNota);


router.delete('/notas/:id',deleteNota);

module.exports = router;
