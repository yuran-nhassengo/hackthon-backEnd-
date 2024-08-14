const asyncHandler = require('express-async-handler');
const Professor = require('./professor-model');
const bcrypt = require('bcryptjs');


const createProfessor = asyncHandler(async (req, res) => {
  const { nome, sexo, email, senha } = req.body;

  if (!nome || !sexo || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const novoProfessor = await Professor.create({
         nome,
         sexo,
        email,
        senha });
   
    res.status(201).json({ message: 'Professor criado com sucesso!', novoProfessor });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar professor', error: err.message });
  }
});


const getProfessores = asyncHandler(async (req, res) => {
  try {
    const professores = await Professor.find();
    res.status(200).json(professores);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar professores', error: err.message });
  }
});


const getProfessorById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const professor = await Professor.findById(id);
    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    res.status(200).json(professor);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar professor', error: err.message });
  }
});


const updateProfessor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { nome, sexo, email, senha } = req.body;

  try {
    let atualizacao = { nome, sexo, email };

    if (senha) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(senha, salt);
      atualizacao.senha = hashedPassword;
    }

    const professor = await Professor.findByIdAndUpdate(id, atualizacao, { new: true });
    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    res.status(200).json(professor);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar professor', error: err.message });
  }
});


const deleteProfessor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await Professor.findByIdAndDelete(id);
    if (!resultado) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    res.status(200).json({ message: 'Professor excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir professor', error: err.message });
  }
});

module.exports = {
  createProfessor,
  getProfessores,
  getProfessorById,
  updateProfessor,
  deleteProfessor,
};
