const asyncHandler = require('express-async-handler');
const Professor = require('../model/professor-model');
const Turma = require('../model/turma-model');
const Classe = require('../model/classe-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (userId) => {
  const secret = process.env.SECRET || 'secreta'; 
  const options = { expiresIn: '1h' };
  return jwt.sign({ id: userId }, secret, options);
};


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (token == null) return res.sendStatus(401); 

  jwt.verify(token, process.env.SECRET || 'secreta', (err, user) => {
    if (err) return res.sendStatus(403); 
    req.user = user; 
    next(); 
  });
};


const login = asyncHandler(async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const professor = await Professor.findOne({ email });

    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado!' });
    }

    
    const isMatch = await bcrypt.compare(senha, professor.senha);

    if (!isMatch) {
      return res.status(401).json({ message: 'Senha inválida!' });
    }

   
    const token = generateToken(professor._id);

    res.status(200).json({
      message: `Bem-vindo, ${professor.nome}!`,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});


const createProfessor = asyncHandler(async (req, res) => {
  const { nome, sexo, email, senha } = req.body;

  if (!nome || !sexo || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const existingProfessor = await Professor.findOne({ email });

    if (existingProfessor) {
      return res.status(400).json({ message: 'Professor já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

   
    const novoProfessor = await Professor.create({
      nome,
      sexo,
      email,
      senha: hashedPassword,
    });

    res.status(201).json({ message: 'Professor criado com sucesso!' });
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


const getQuantidadeClassesPorProfessor = async (req, res) => {
  const professorId = req.user.id; 

  try {
    const quantidadeTurmas = await Turma.countDocuments({ idProfessor: professorId });
    res.json({ quantidadeTurmas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getQuantidadeDisciplinasPorProfessor = async (req, res) => {
  const professorId = req.user.id; 

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

const getTurmasPorProfessor = async (req, res) => {
  const professorId = req.user.id;

  try {
    const turmas = await Turma.find({ idProfessor: professorId });
    res.json(turmas);
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
  getQuantidadeDisciplinasPorProfessor,
  login,
  authenticateToken,
  getTurmasPorProfessor
};
