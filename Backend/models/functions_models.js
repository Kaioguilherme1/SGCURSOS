const sequelize = require('../config/sequelize');
const { databaseLogger } = require('../config/logger');
// Defina uma função assíncrona para executar o SQL personalizado
async function createSQLFunctions() {
  try {
    // SQL personalizado para configurar a sincronização de funções
    const sql = `
      -- Função para retornar informações do usuário
      CREATE OR REPLACE FUNCTION get_user_info()
        RETURNS TABLE (user_name VARCHAR(100), created_date DATE, created_time TIME)
      AS $$
      BEGIN
        RETURN QUERY
          SELECT name AS user_name, "createdAt"::date, "createdAt"::time
          FROM "Users";
      END;
      $$ LANGUAGE plpgsql;
    `;

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