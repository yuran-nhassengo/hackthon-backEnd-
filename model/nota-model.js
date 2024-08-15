const mongoose = require('mongoose');


const notasSchema = new mongoose.Schema({
  nota: {
    type: Number,
    required: true, 
    min: 0, 
    max: 20 
  },
  idAluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aluno', 
    required: true,
  },
  idAvaliacao: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Avaliacao', 
    required: true, 
  },
});

const Notas = mongoose.model('Notas', notasSchema);

module.exports = Notas;