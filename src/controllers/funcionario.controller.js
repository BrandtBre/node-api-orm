const db = require('../models');
const Funcionario = db.rest.models.funcionarios;

exports.getFuncionario = async (req, res) => {
  const { id } = req.params;

  try {
    const funcionario = await Funcionario.findOne({
      where: {
        id,
      },
    });

    if (!funcionario) {
      return res.status(400).send({
        message: `Não foi encontrado um funcionario com id ${id}`,
      });
    }

    return res.send(funcionario);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.createFuncionario = async (req, res) => {
  const { nome, endereco, email, celular } = req.body;
  if (!nome || !endereco || !email || !celular) {
    return res.status(400).send({
      message: 'Por favor, informe todos os dados necessário para cadastrar um novo produto!',
    });
  }

  let emailExiste = await Funcionario.findOne({
    where: {
      email,
    },
  });

  if (emailExiste) {
    return res.status(400).send({
      message: 'Já existe um funcionario cadastrado com esse email!',
    });
  }

  let celularExiste = await Funcionario.findOne({
    where: {
        celular,
    },
  });

  if (celularExiste) {
    return res.status(400).send({
      message: 'Já existe um funcionario cadastrado com esse celular!',
    });
  }

  try {
    let novoFuncionario = await Funcionario.create({
      nome,
      endereco, 
      email, 
      celular
    });
    return res.send(novoFuncionario);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.deleteFuncionario = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      message: 'Por favor, informe o ID do funcionario que você está tentando deletar!',
    });
  }

  const funcionario = await Funcionario.findOne({
    where: {
      id,
    },
  });

  if (!funcionario) {
    return res.status(400).send({
      message: `Nenhum funcionario encontrado com o id ${id}`,
    });
  }

  try {
    await funcionario.destroy();
    return res.send({
      message: `Funcionario ${id} foi deletado!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.updateFuncionario= async (req, res) => {
  const { nome, endereco, email, celular } = req.body;
  const { id } = req.params;

  const funcionario = await Funcionario.findOne({
    where: {
      id,
    },
  });

  if (!funcionario) {
    return res.status(400).send({
      message: `Nenhum funcionario encontrado com o id ${id}`,
    });
  }

  try {
    if (nome) {
      funcionario.nome = nome;
    }
    if (endereco) {
      funcionario.endereco = endereco;
    }
    if (email) {
      funcionario.email = email;
    }
    if (celular) {
      funcionario.celular = celular;
    }


    funcionario.save();
    return res.send({
      message: `Funcionario ${id} atualizado com sucesso!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};
