const Notas = require('../model/nota-model');
const asyncHandler = require("express-async-handler");


const createNota = asyncHandler(async (req, res) => {
    try {
      const {nota,idAvaliacao,idAluno} = req.body;
  
  
      if (!nota) {
          return res
            .status(400)
            .json({ message: "Todos os campos sao Obrigatorios." });
        }
  
      const novaNota = await Notas.create({
          nota,
          idAluno,
          idAvaliacao });
      
      res.status(201).json(novaNota);
    } catch (err) {
      res.status(400).json({ message: 'Erro ao criar nota', error: err.message });
    }
  });


const getNotas = asyncHandler(async (req, res) => {
    try {
      const notas = await Notas.find().populate('idAluno').populate('idAvaliacao'); 
      res.status(200).json(notas);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar notas', error: err.message });
    }
  });

const getNotaById = asyncHandler(async (req, res) => {
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
  });


const updateNota = asyncHandler(async (req, res) => {
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
  });


const deleteNota = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const resultado = await Notas.findByIdAndDelete(id);
      if (!resultado) {
        return res.status(404).json({ message: 'Nota não encontrada' });
      }
      res.status(200).json({ message: 'Nota excluída com sucesso' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao excluir nota', error: err.message });
    }
  });

  const adicionarNotas = asyncHandler(async (req, res) => {
    const notas = req.body;
  console.log("notas.......",req.body);
    
    if (!Array.isArray(notas) || !notas.every(nota => nota.idAluno && nota.idAvaliacao && typeof nota.nota === 'number')) {
      return res.status(400).json({ message: 'Dados de notas inválidos.' });
    }
  
    try {

      await Promise.all(notas.map(async ({ idAluno, idAvaliacao, nota }) => {
        return Notas.findOneAndUpdate(
          { idAluno, idAvaliacao },
          { nota },
          { upsert: true, new: true }
        );
      }));
  
      res.status(200).json({ message: 'Notas atualizadas com sucesso.' });
    } catch (err) {
      console.log("error.......",err);
      res.status(500).json({ message: 'Erro ao atualizar notas', error: err.message });
    }
  });

module.exports ={createNota,getNotas,getNotaById, updateNota, deleteNota,adicionarNotas}
