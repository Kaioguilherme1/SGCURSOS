const sequelize = require("../config/sequelize");
const {DataTypes} = require("sequelize");

const User = require('./users_model');
const Course = require('./courses_model');
const Category = require('./categories_model');
const Certificate = require('./certificates_model');
const Registration = require('./Registration_model');

module.exports = {
    User,
    Course,
    Category,
    Certificate,
    Registration,
}
