const Turma = require('../model/turma-model');


const createTurma = async (req, res) => {
  try {
    const { numero, sala, idClasse, idProfessor } = req.body;

    console.log("Turma o professor........1",idClasse)
    const novaTurma = await Turma.create({
       numero,
        sala,
         Classe:idClasse,
          idProfessor });
    res.status(201).json(novaTurma);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar turma', error: err.message });
  }
};


const getTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find().populate('idProfessor').populate('idClasse').exec() ; 
    res.status(200).json(turmas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar turmas', error: err.message });
  }
};


const getTurmaById = async (req, res) => {
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
};


const updateTurma = async (req, res) => {
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
};


const deleteTurma = async (req, res) => {
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
};


module.exports ={createTurma,getTurmas,getTurmaById,updateTurma,deleteTurma}