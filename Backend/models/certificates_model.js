const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Registration = require('./Registration_model');
const Certificate = sequelize.define('Certificate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Registration_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Registration,
      key: 'id'
    }
  },
  issued_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
});

module.exports = Certificate;