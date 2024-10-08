const asyncHandler = require("express-async-handler");

const Avaliacao = require("../model/avaliacao-model");

const createAvaliacao = asyncHandler(async (req, res) => {

  console.log("cheguei...1");
  try {
    const { numero, materia, data } = req.body;

    if (!numero || !materia || !data) {
      return res
        .status(400)
        .json({ message: "Todos os campos sao Obrigatorios." });
    }

    console.log("cheguei...2",req.body);

    const novaAvaliacao = await Avaliacao.create({
      numero,
      materia,
      data,
    });

    console.log("cheguei...3",req.body);

    res
      .status(201)
      .json({ message: "Avaliacao criada com sucesso!", novaAvaliacao });
  } catch (err) {
    console.log("cheguei...4",err);
    res.status(400).json({ message: "Erro ao criar avaliação", error: err.message });
  }
});

const getAvaliacoes = asyncHandler(async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.find();
    res.status(200).json(avaliacoes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao buscar avaliações", error: err.message });
  }
});

const getAvaliacaoById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const avaliacao = await Avaliacao.findById(id);
    if (!avaliacao) {
      return res.status(404).json({ message: "Avaliação não encontrada" });
    }
    res.status(200).json(avaliacao);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao buscar avaliação", error: err.message });
  }
});

const updateAvaliacao = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacao = req.body;
    const avaliacao = await Avaliacao.findByIdAndUpdate(id, atualizacao, { new: true });
    if (!avaliacao) {
      return res.status(404).json({ message: 'Avaliação não encontrada' });
    }
    res.status(200).json(avaliacao);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar avaliação', error: err.message });
  }
});


const deleteAvaliacao = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Avaliacao.findByIdAndDelete(id);
    if (!resultado) {
      return res.status(404).json({ message: "Avaliação não encontrada" });
    }
    res.status(200).json({ message: "Avaliação excluída com sucesso" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao excluir avaliação", error: err.message });
  }
};

module.exports = { createAvaliacao,getAvaliacaoById,deleteAvaliacao,getAvaliacoes,updateAvaliacao};
