const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Certificate = sequelize.define('Certificate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
 final_grade: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  issued_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
});

module.exports = Certificate;