const asyncHandler = require('express-async-handler');
const Turma = require('../model/turma-model');
const Aluno = require('../model/aluno-model');
const mongoose = require('mongoose');

const createTurma = asyncHandler(async (req, res) => {
  try {
    const { numero, sala, idClasse, idProfessor } = req.body;

    console.log("Criando turma com idClasse:", idClasse);

    const novaTurma = await Turma.create({
      numero,
      sala,
      idClasse,
      idProfessor
    });

    res.status(201).json(novaTurma);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar turma', error: err.message });
  }
});

const getTurmas = asyncHandler(async (req, res) => {
  try {
    const turmas = await Turma.find()
      .populate('idClasse', 'nome')
      .populate('idProfessor', 'nome')
      .exec();

    res.status(200).json(turmas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar turmas', error: err.message });
  }
});

const getTurmaById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const turma = await Turma.findById(id).populate('idProfessor');
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    res.status(200).json(turma);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar turma', error: err.message });
  }
});

const updateTurma = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacao = req.body;
    const turma = await Turma.findByIdAndUpdate(id, atualizacao, { new: true }).populate('idProfessor');
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    res.status(200).json(turma);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar turma', error: err.message });
  }
});

const deleteTurma = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Turma.findByIdAndDelete(id);
    if (!resultado) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    res.status(200).json({ message: 'Turma excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir turma', error: err.message });
  }
});

const getAlunosByTurma = asyncHandler(async (req, res) => {
  const turmaId = req.query.idTurma;

  console.log("Buscando alunos para turma:", turmaId);

  try {
    if (turmaId && !mongoose.Types.ObjectId.isValid(turmaId)) {
      return res.status(400).json({ message: "ID da turma inválido." });
    }

    const query = turmaId ? { idTurma: turmaId } : {};

    const alunos = await Aluno.find(query).populate('idTurma');
    res.status(200).json(alunos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar alunos', error: err.message });
  }
});

const getQuantidadeTurmas = asyncHandler(async (req, res) => {
  const professorId = req.user.id; 
  
  try {
    const quantidadeTurmas = await Turma.countDocuments({ idProfessor: professorId });
    res.json({ quantidadeTurmas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createTurma,
  getTurmas,
  getTurmaById,
  updateTurma,
  deleteTurma,
  getAlunosByTurma,
  getQuantidadeTurmas
};
