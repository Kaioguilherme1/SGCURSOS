const sequelize = require('../config/sequelize');
const { databaseLogger } = require('../config/logger');
const {sql} = require("./Functions_template");


// Defina uma função assíncrona para executar o SQL personalizado
async function createSQLFunctions() {
  try {
    // SQL personalizado para configurar a sincronização de funções

    // Executa o SQL usando o método `query` do objeto `sequelize`
    await sequelize.query(sql, { type: sequelize.QueryTypes.RAW });

    console.log('SQL personalizado executado com sucesso!');
    databaseLogger.info('SQL personalizado executado com sucesso!');
  } catch (error) {
    console.error('Erro ao executar o SQL personalizado:', error);
    databaseLogger.error('Erro ao executar o SQL personalizado:', error);
  }
}

module.exports = {createSQLFunctions}