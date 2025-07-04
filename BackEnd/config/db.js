const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('agendaDB', 'postgres', 'raposo', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;