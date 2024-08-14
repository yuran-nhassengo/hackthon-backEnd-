const asyncHandler = require("express-async-handler");

const Aluno = require('../model/aluno-model');


const createAluno = asyncHandler(async (req, res) => {
    try {
      const { nome, dataNascimento, sexo, idTurma } = req.body;

      if (!nome || !dataNascimento || !sexo || !idTurma) {
        return res
          .status(400)
          .json({ message: "Todos os campos sao Obrigatorios." });
      }
  
      const novoAluno = await Aluno.create({ 
        nome, 
        dataNascimento,
         sexo,
        idTurma });
  
      res.status(201).json( {message: "Aluno criado com sucesso!",resultado});
    } catch (err) {
      res.status(400).json({ message: 'Erro ao criar aluno', error: err.message });
    }
  });


const getAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find().populate('idTurma'); 
    res.status(200).json(alunos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar alunos', error: err.message });
  }
};


const getAlunoById = async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findById(id).populate('idTurma');
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.status(200).json(aluno);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar aluno', error: err.message });
  }
};
const updateAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacao = req.body;
    const aluno = await Aluno.findByIdAndUpdate(id, atualizacao, { new: true }).populate('idTurma');
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.status(200).json(aluno);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar aluno', error: err.message });
  }
};
const deleteAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Aluno.findByIdAndDelete(id);
    if (!resultado) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.status(200).json({ message: 'Aluno excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir aluno', error: err.message });
  }
};



module.exports ={createAluno,getAlunos,getAlunoById, updateAluno, deleteAluno};
