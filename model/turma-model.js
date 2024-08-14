const mongoose = require('mongoose');


const turmaSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: true, 
  },
  sala: {
    type: Number,
    required: true, 
  },
  Classe: {
    type: String,
    required: true, 
  },
  idProfessor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor', 
    required: true, 
  },
});


const Turma = mongoose.model('Turma', turmaSchema);

module.exports = Turma;
