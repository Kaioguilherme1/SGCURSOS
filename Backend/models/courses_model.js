const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Category = require('./categories_model');
const User = require("./users_model");

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
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  participants: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
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
  lessons: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  banner: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Course;
