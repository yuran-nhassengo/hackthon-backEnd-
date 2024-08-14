const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  disciplinas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disciplina'
  }]
}, {
  timestamps: true,
});


const Classe = mongoose.model('Classe', classeSchema);

module.exports = Classe;
