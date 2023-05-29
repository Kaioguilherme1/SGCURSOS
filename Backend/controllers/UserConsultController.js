const {hasPermissionAdmin} = require("../middleware/roles");
const {requestLogger} = require("../config/logger");
const sequelize = require("../config/sequelize");
const {QueryTypes} = require("sequelize");

// Controlador para obter todos os usuários
const getAllUsersInfo = async (token) => {
  if (hasPermissionAdmin(token) || true) {
    try {
      requestLogger.info('Tentativa de obter todos os usuários');
      const query = `
        SELECT * FROM get_user_info();
      `;
      
      // Execute a consulta usando o Sequelize
      const result = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });

      requestLogger.info('Usuários obtidos com sucesso');
      return result;
    } catch (error) {
      requestLogger.error('Erro ao obter usuários: ' + error.message);
      //throw new Error('Erro ao obter usuários');
    }
  } else {
    requestLogger.error('Usuário não tem permissão para listar usuários');
    throw new Error('Usuário não tem permissão para listar usuários');
    return {
        error: true,
        message: 'Usuário não tem permissão para listar usuários',
    }
  }
};

// Exporte o controlador
module.exports = { getAllUsersInfo };

