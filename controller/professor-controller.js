const asyncHandler = require('express-async-handler');
const Professor = require('../model/professor-model');
const Turma = require('../model/turma-model');

const Classe = require('../model/classe-model');

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
    console.log("Professor......1");
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

const getQuantidadeClassesPorProfessor = async (req, res) => {
  const professorId = req.professorId;

  try {
    const quantidadeTurmas = await Turma.countDocuments({ idProfessor: professorId });

    res.json({ quantidadeTurmas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuantidadeDisciplinasPorProfessor = async (req, res) => {
  const professorId = req.professorId; 

  try {

    const turmas = await Turma.find({ idProfessor: professorId }).populate('idClasse');

    
    const disciplinas = new Set();
    for (const turma of turmas) {
      const classe = turma.idClasse;
      if (classe && classe.disciplinas) {
        classe.disciplinas.forEach(disciplinaId => disciplinas.add(disciplinaId.toString()));
      }
    }

    res.json({ quantidadeDisciplinas: disciplinas.size });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createProfessor,
  getProfessores,
  getProfessorById,
  updateProfessor,
  deleteProfessor,
  getQuantidadeClassesPorProfessor,
  getQuantidadeDisciplinasPorProfessor 
};
