const mongoose = require('mongoose');


const disciplinaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  timestamps: true,
});

const Disciplina = mongoose.model('Disciplina', disciplinaSchema);

module.exports = Disciplina;
