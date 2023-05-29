const Sequelize = require('sequelize');
const database = require('./database');
const logger = require('./logger');

const sequelize = new Sequelize(database)

module.exports = sequelize;