const db = require('../models');
const Produto = db.rest.models.produtos;

exports.getProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findOne({
      where: {
        id,
      },
    });

    if (!produto) {
      return res.status(400).send({
        message: `Não foi encontrado um produto com id ${id}`,
      });
    }

    return res.send(produto);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.createProduto = async (req, res) => {
  const { nome, codigo, preco, tipo } = req.body;
  if (!nome || !codigo || !preco || !tipo) {
    return res.status(400).send({
      message: 'Por favor, informe todos os dados necessário para cadastrar um novo produto!',
    });
  }

  let codigoExiste = await Produto.findOne({
    where: {
      codigo,
    },
  });

  if (codigoExiste) {
    return res.status(400).send({
      message: 'Já existe um produto cadastrado com esse codigo!',
    });
  }

  try {
    let novoProduto = await Produto.create({
      nome,
      codigo,
      preco,
      tipo,
    });
    return res.send(novoProduto);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.deleteProduto = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      message: 'Por favor, informe o ID do produto que você está tentando deletar!',
    });
  }

  const produto = await Produto.findOne({
    where: {
      id,
    },
  });

  if (!produto) {
    return res.status(400).send({
      message: `Nenhum produto encontrado com o id ${id}`,
    });
  }

  try {
    await produto.destroy();
    return res.send({
      message: `Produto ${id} foi deletado!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.updateProduto= async (req, res) => {
  const { nome, codigo, preco, tipo } = req.body;
  const { id } = req.params;

  const produto = await Produto.findOne({
    where: {
      id,
    },
  });

  if (!produto) {
    return res.status(400).send({
      message: `Nenhum produto encontrado com o id ${id}`,
    });
  }

  try {
    if (nome) {
      produto.nome = nome;
    }
    if (codigo) {
      produto.codigo = codigo;
    }
    if (preco) {
      produto.preco = preco;
    }
    if (tipo) {
      produto.tipo = tipo;
    }


    produto.save();
    return res.send({
      message: `Produto ${id} atualizado com sucesso!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};
