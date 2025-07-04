const bcrypt = require('bcrypt');
const { User, Log } = require('../models');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Senha inválida' });

    req.session.userId = user.id;
    await Log.create({ userId: user.id, action: 'login', message: 'Usuário logado com sucesso' });
    res.status(200).json({ message: 'Login bem-sucedido', user: { id: user.id, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: 'Erro no login' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout realizado com sucesso' });
  });
};

exports.ensureAuth = (req, res, next) => {
  if (req.session.userId) return next();
  res.status(401).json({ error: 'Não autorizado' });
};