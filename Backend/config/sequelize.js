const Sequelize = require('sequelize');
const database = require('./database');


const sequelize = new Sequelize(database)

module.exports = sequelize;