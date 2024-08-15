const asyncHandler = require('express-async-handler');
const Classe = require('../model/classe-model');
const Disciplina = require('../model/disciplina-model');


const createClasse = asyncHandler(async (req, res) => {
  const { nome, disciplinas } = req.body;

  if (!nome) {
    return res.status(400).json({ message: 'O nome da classe é obrigatório.' });
  }

  try {
   
    if (disciplinas) {
      const disciplinasExistentes = await Disciplina.find({ '_id': { $in: disciplinas } });
      if (disciplinasExistentes.length !== disciplinas.length) {
        return res.status(400).json({ message: 'Algumas disciplinas fornecidas não existem.' });
      }
    }

    const novaClasse = new Classe({ nome, disciplinas });
    await novaClasse.save();
    res.status(201).json({ message: 'Classe criada com sucesso!', novaClasse });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar classe', error: err.message });
  }
});

const getDisciplinasPorClasse = asyncHandler(async (req, res) => {
    const { id } = req.params;

    console.log("chegouuuu........1",id);
  
    try {
      const classe = await Classe.findById(id).populate('disciplinas', 'nome');

      console.log("classes........",classe)
  
      if (!classe) {
        console.log("'classe nao encontrada");
        return res.status(404).json({ message: 'Classe não encontrada' });
      }
  
      res.status(200).json(classe.disciplinas);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao obter disciplinas por classe', error: err.message });
    }
  });


const updateClasse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { nome, disciplinas } = req.body;

  try {
    const classe = await Classe.findById(id);

    if (!classe) {
      return res.status(404).json({ message: 'Classe não encontrada' });
    }

   
    if (disciplinas) {
      const disciplinasExistentes = await Disciplina.find({ '_id': { $in: disciplinas } });
      if (disciplinasExistentes.length !== disciplinas.length) {
        return res.status(400).json({ message: 'Algumas disciplinas fornecidas não existem.' });
      }
    }

    classe.nome = nome || classe.nome;
    classe.disciplinas = disciplinas || classe.disciplinas;
    const classeAtualizada = await classe.save();

    res.status(200).json(classeAtualizada);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar classe', error: err.message });
  }
});


const getClasses = asyncHandler(async (req, res) => {
  try {
    const classes = await Classe.find().populate('disciplinas', 'nome');
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter classes', error: err.message });
  }
});


const getClasseById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const classe = await Classe.findById(id).populate('disciplinas', 'nome');

    if (!classe) {
      return res.status(404).json({ message: 'Classe não encontrada' });
    }

    res.status(200).json(classe);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter classe', error: err.message });
  }
});


const deleteClasse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const classe = await Classe.findByIdAndDelete(id);

    if (!classe) {
      return res.status(404).json({ message: 'Classe não encontrada' });
    }

    res.status(200).json({ message: 'Classe excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir classe', error: err.message });
  }
});

module.exports = {
  createClasse,
  updateClasse,
  getClasses,
  getClasseById,
  deleteClasse,
  getDisciplinasPorClasse 
};
