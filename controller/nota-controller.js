const Notas = require('../models/notas');


const createNota = async (req, res) => {
  try {
    const { nota} = req.body;

    const turmaId =  req.aluno.id; 


    if (!nota) {
        return res
          .status(400)
          .json({ message: "Todos os campos sao Obrigatorios." });
      }

    const novaNota = await Notas.create({
         nota,
        idAluno:turmaId,
        idAvaliacao:turmaId });
    
    res.status(201).json(resultado);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar nota', error: err.message });
  }
};


const getNotas = async (req, res) => {
  try {
    const notas = await Notas.find().populate('idAluno').populate('idAvaliacao'); // Inclui dados referenciados
    res.status(200).json(notas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar notas', error: err.message });
  }
};

const getNotaById = async (req, res) => {
  try {
    const { id } = req.params;
    const nota = await Notas.findById(id).populate('idAluno').populate('idAvaliacao');
    if (!nota) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }
    res.status(200).json(nota);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar nota', error: err.message });
  }
};
const updateNota = async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacao = req.body;
    const nota = await Notas.findByIdAndUpdate(id, atualizacao, { new: true }).populate('idAluno').populate('idAvaliacao');
    if (!nota) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }
    res.status(200).json(nota);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar nota', error: err.message });
  }
};




module.exports ={createNota,getNotas,getNotaById, updateNota}
