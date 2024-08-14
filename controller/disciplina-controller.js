const asyncHandler = require('express-async-handler');
const Disciplina = require('../model/disciplina-model');


const createDisciplina = asyncHandler(async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ message: 'O nome da disciplina é obrigatório.' });
  }

  try {
    const novaDisciplina = new Disciplina({ nome });
    await novaDisciplina.save();
    res.status(201).json({ message: 'Disciplina criada com sucesso!', novaDisciplina });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar disciplina', error: err.message });
  }
});


const updateDisciplina = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const disciplina = await Disciplina.findById(id);

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    disciplina.nome = nome || disciplina.nome;
    const disciplinaAtualizada = await disciplina.save();

    res.status(200).json(disciplinaAtualizada);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar disciplina', error: err.message });
  }
});

const getDisciplinas = asyncHandler(async (req, res) => {
  try {
    const disciplinas = await Disciplina.find();
    res.status(200).json(disciplinas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter disciplinas', error: err.message });
  }
});


const getDisciplinaById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const disciplina = await Disciplina.findById(id);

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    res.status(200).json(disciplina);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter disciplina', error: err.message });
  }
});


const deleteDisciplina = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const disciplina = await Disciplina.findByIdAndDelete(id);

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    res.status(200).json({ message: 'Disciplina excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir disciplina', error: err.message });
  }
});

module.exports = {
  createDisciplina,
  updateDisciplina,
  getDisciplinas,
  getDisciplinaById,
  deleteDisciplina
};
