const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Category = require('./categories_model');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  categories_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Category,
        key: 'id'
    }
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duration_hours: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  enrolled_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});


module.exports = Course;
