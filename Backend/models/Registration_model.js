const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Importe os modelos necessários
const User = require('./users_model');
const Course = require('./courses_model');
const Certificate = require('./certificates_model');

const Registration = sequelize.define('Registration', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  progress_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  final_grade: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

// Relacionamentos
Registration.belongsTo(User, {
  foreignKey: 'User_id',
  allowNull: false
});

Registration.belongsTo(Course, {
  foreignKey: 'Course_id',
  allowNull: false
});

Registration.belongsTo(Certificate, {
  foreignKey: 'Certificate_id',
  allowNull: true
});

User.hasMany(Registration, {
  foreignKey: 'User_id',
  allowNull: false
});


module.exports = Registration;