const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Certificate = sequelize.define('Certificate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  course_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  course_duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  registration_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  issued_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  final_grade: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  validate_code: {
    type: DataTypes.STRING,
    allowNull: true
  }
});


module.exports = Certificate;