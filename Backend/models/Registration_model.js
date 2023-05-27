const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./users_model');
const Course = require('./courses_model');

const Registration = sequelize.define('Registration', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
    User_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
    Course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Course,
        key: 'id'
    }
    }
});

module.exports = Registration;
