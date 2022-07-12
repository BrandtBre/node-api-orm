const db = require('../models');
const Nota = db.rest.models.notas;

exports.getNota = async (req, res) => {
  const { id } = req.params;

  try {
    const nota = await Nota.findOne({
      where: {
        id,
      },
    });

    if (!nota) {
      return res.status(400).send({
        message: `Não foi encontrado um nota com id ${id}`,
      });
    }

    return res.send(nota);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.createNota = async (req, res) => {
  const { nota, peso, nome } = req.body;
  if (!nota || !peso || !nome) {
    return res.status(400).send({
      message: 'Por favor, informe todos os dados necessário para cadastrar uma nova nota... BOBÃO!',
    });
  }

  let nomeExiste = await Nota.findOne({
    where: {
      nome,
    },
  });

  if (nomeExiste) {
    return res.status(400).send({
      message: 'Já existe um um aluno com esse nome, vai ter que mudar de nome otario!',
    });
  }

  try {
    let novaNota = await Nota.create({
      nota,
      peso,
      nome
    });
    return res.send(novaNota);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.deleteNota = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      message: 'Por favor, informe o ID da nota que tu quer deletar!',
    });
  }

  const nota = await Nota.findOne({
    where: {
      id,
    },
  });

  if (!nota) {
    return res.status(400).send({
      message: `Nenhum nota encontrada com o id ${id}`,
    });
  }

  try {
    await nota.destroy();
    return res.send({
      message: `Nota ${id} foi deletado!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.updateNota= async (req, res) => {
  const { nota, peso, nome } = req.body;
  const { id } = req.params;

  const notas = await Nota.findOne({
    where: {
      id,
    },
  });

  if (!notas) {
    return res.status(400).send({
      message: `Nenhum nota encontrado com o id ${id}`,
    });
  }

  try {
    if (nota) {
      nota.nota = nota;
    }
    if (peso) {
      nota.peso = peso;
    }
    if (nome) {
      nota.nome = nome;
    }
    
    nota.save();
    return res.send({
      message: `Nota ${id} atualizado com sucesso!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};
