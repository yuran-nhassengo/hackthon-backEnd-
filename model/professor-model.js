const mongoose = require('mongoose');


const professorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true, 
  },
  sexo: {
    type: String,
    enum: ['Masculino', 'Feminino', 'Outro'], 
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
    lowercase: true, 
  },
  senha: {
    type: String,
    required: true,
    minlength: 6, 
  },
}, {
  timestamps: true, 
});


const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;
