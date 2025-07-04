const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING
}, { 
    tableName: 'users',
    freezeTableName: true,
    timestamps: true
 });

module.exports = User;