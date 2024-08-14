const asyncHandler = require('express-async-handler');

const Avaliacao =require('../model/avaliacao-model');


const createAvaliacao = asyncHandler(async (req, res) => {

    try {
      const { numero, materia, data } = req.body;

      if(!numero || !materia || !data){

        return res.status(400).json({message:"Todos os campos sao Obrigatorios."})
    }

      const novaAvaliacao = await Avaliacao.create({
         numero,
         materia,
         data 
        });


        res.status(201).json({ message: 'Avaliacao criada com sucesso!',novaAvaliacao});


    } catch (err) {
      res.status(400).json({ message: 'Erro ao criar avaliação', error: err.message });
    }
  });

  

  module.exports ={createAvaliacao}