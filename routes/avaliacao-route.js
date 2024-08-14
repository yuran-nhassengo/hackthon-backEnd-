const express = require('express');
const router = express.Router();
const  { createAvaliacao,getAvaliacaoById,deleteAvaliacao,getAvaliacoes,updateAvaliacao}= require('../controller/avaliacao-controller');


router.post('/avaliacoes',createAvaliacao);


router.get('/avaliacoes',getAvaliacoes);


router.get('/avaliacoes/:id',getAvaliacaoById);


router.put('/avaliacoes/:id',updateAvaliacao);


router.delete('/avaliacoes/:id',deleteAvaliacao);

module.exports = router;