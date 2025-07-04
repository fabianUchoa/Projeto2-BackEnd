const sequelize = require('../config/db');
const User = require('./User');
const Event = require('./Event');
const Log = require('./Log');

User.hasMany(Event, { foreignKey: 'userId' });
Event.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Log, { foreignKey: 'userId' });
Log.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Event, Log };