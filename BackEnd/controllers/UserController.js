const bcrypt = require('bcrypt');
const { User, Log } = require('../models');

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    await Log.create({ action: 'listar_usuarios', message: 'Listagem de usuários', userId: req.session.userId });
    res.json(users);
  } catch (err) {
    await Log.create({ action: 'erro_listar_usuarios', message: err.message, userId: req.session.userId });
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    const user = await User.create(data);
    await Log.create({ action: 'criar_usuario', message: `Usuário criado: ${user.email}`, userId: user.id });
    res.status(201).json(user);
  } catch (err) {
    await Log.create({ action: 'erro_criar_usuario', message: err.message });
    res.status(400).json({ error: 'Erro ao criar usuário' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { id } });
    await Log.create({ action: 'deletar_usuario', message: `Usuário deletado: ${id}`, userId: id });
    res.sendStatus(204);
  } catch (err) {
    await Log.create({ action: 'erro_deletar_usuario', message: err.message, userId: id });
    res.status(400).json({ error: 'Erro ao deletar usuário' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const [updated] = await User.update(updates, {
      where: { id }
    });

    if (updated) {
      await Log.create({
        action: 'editar_usuario',
        message: `Usuário editado: ${id}`,
        userId: req.session.userId || id
      });
      res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    await Log.create({
      action: 'erro_editar_usuario',
      message: err.message,
      userId: req.session.userId || id
    });
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};