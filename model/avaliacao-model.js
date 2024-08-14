const mongoose = require('mongoose');


const avaliacaoSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: true,
    unique: true, 
  },
  materia: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
});


const Avaliacao = mongoose.model('Avaliacao',avaliacaoSchema);

module.exports = Avaliacao;