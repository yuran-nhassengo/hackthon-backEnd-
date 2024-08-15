const asyncHandler = require("express-async-handler");

const Aluno = require('../model/aluno-model');
const Turma = require('../model/turma-model');
const { default: mongoose } = require("mongoose");


const createAluno = asyncHandler(async (req, res) => {
  const turmaId = req.body.idTurma; 

  console.log("Aluno..........1");

  try {
    const { nome, dataNascimento, sexo } = req.body;

    if (!nome || !dataNascimento || !sexo || !turmaId) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    console.log("Aluno..........2");

    
    if (!mongoose.Types.ObjectId.isValid(turmaId)) {
      return res.status(400).json({ message: "ID da turma inválido." });
    }

    const novoAluno = await Aluno.create({
      nome,
      dataNascimento,
      sexo,
      idTurma: turmaId
    });

    res.status(201).json({ message: "Aluno criado com sucesso!", novoAluno });
  } catch (err) {
    console.log("Aluno..........erro", err);
    res.status(400).json({ message: 'Erro ao criar aluno', error: err.message });
  }
});


const getAlunos = asyncHandler(async (req, res) => {
    try {
      const alunos = await Aluno.find().populate('idTurma'); 
      res.status(200).json(alunos);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar alunos', error: err.message });
    }
  });


const getAlunoById = asyncHandler(async (req, res) => {
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
  });


const updateAluno = asyncHandler(async (req, res) => {
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
  });


const deleteAluno = asyncHandler(async (req, res) => {
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
  }
  );

  const getAlunosPorTurma = asyncHandler(async (req, res) => {
    const { idTurma } = req.params;
  
   console.log("quase....1",idTurma)
    if (!mongoose.Types.ObjectId.isValid(idTurma)) {
      return res.status(400).json({ message: 'ID da turma inválido.' });
    }
  
    try {

      const alunos = await Aluno.find({ idTurma });
      console.log("quase....2",alunos)
      
      if (alunos.length === 0) {
        return res.status(404).json({ message: 'Nenhum aluno encontrado para esta turma.' });
      }
  

      res.status(200).json(alunos);
      console.log("quase....33",alunos);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar alunos', error: err.message });
    }
  });

  const getAlunosPorTurmaPr = async (req, res) => {
    
    const professorId = req.professorId;
  
    try {
      
      const turmas = await Turma.find({ idProfessor: professorId });
      
      let totalAlunos = 0;
  
      for (const turma of turmas) {
        const alunosCount = await Aluno.countDocuments({ idTurma: turma._id });
        totalAlunos += alunosCount;
      }
  
     
      res.json({ totalAlunos });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports ={createAluno,getAlunos,getAlunoById, updateAluno, deleteAluno,getAlunosPorTurma,getAlunosPorTurmaPr};