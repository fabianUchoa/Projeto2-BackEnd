const { Log, User } = require('../models');

exports.createLog = async (req, res) => {
  try {
    const data = req.body;
    
    const log = await Log.create(data);
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar log' });
  }
};

exports.listLogs = async (req, res) => {
  try {
    const logs = await Log.findAll({ include: [{ model: User, attributes: ['name', 'email'] }] });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar logs' });
  }
};