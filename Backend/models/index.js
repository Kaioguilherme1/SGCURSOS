const sequelize = require("../config/sequelize");

const User = require('./users_model');
const Course = require('./courses_model');
const Category = require('./categories_model');
const Registration = require('./Registration_model');
const Certificate = require('./certificates_model');

// Defina aqui os relacionamentos entre os modelos, se necessário
module.exports = {
  User,
  Course,
  Category,
  Registration,
  Certificate
};
