const mongoose = require('mongoose');


const alunoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true, 
  },
  dataNascimento: {
    type: Date,
    required: true, 
  },
  sexo: {
    type: String,
    enum: ['Masculino', 'Feminino', 'Outro', 'masculino', 'feminino', 'outro'],
    required: true, 
  },
  idTurma: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Turma', 
    required: true, 
  },
});


const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;