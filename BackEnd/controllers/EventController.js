const { Event, Log } = require('../models');

exports.createEvent = async (req, res) => {
  try {
    const data = req.body;
    if (!data.title || !data.date || !req.session.userId) {
      await Log.create({ action: 'erro_criar_evento', message: 'Campos obrigatórios faltando', userId: req.session.userId });
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }
    data.userId = req.session.userId;
    const newEvent = await Event.create(data);
    await Log.create({ action: 'criar_evento', message: `Evento criado: ${data.title}`, userId: data.userId });
    res.status(201).json(newEvent);
  } catch (err) {
    await Log.create({ action: 'erro_criar_evento', message: err.message, userId: req.session.userId });
    res.status(400).json({ error: 'Erro ao criar evento' });
  }
};

exports.listEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ where: { userId: req.session.userId } });
    await Log.create({ action: 'listar_eventos', message: 'Eventos listados com sucesso', userId: req.session.userId });
    res.json(events);
  } catch (err) {
    await Log.create({ action: 'erro_listar_eventos', message: err.message, userId: req.session.userId });
    res.status(500).json({ error: 'Erro ao listar eventos' });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: 'Evento não encontrado' });
    await event.destroy();
    await Log.create({ action: 'deletar_evento', message: `Evento deletado: ${id}`, userId: req.session.userId });
    res.json({ message: 'Evento deletado com sucesso' });
  } catch (err) {
    await Log.create({ action: 'erro_deletar_evento', message: err.message, userId: req.session.userId });
    res.status(400).json({ error: 'Erro ao deletar evento' });
  }
};