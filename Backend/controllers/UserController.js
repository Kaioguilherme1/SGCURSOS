const {User} = require('../models/index');
const bycrypt = require('bcrypt');
const {Op} = require("sequelize");
const TokenController = require("../middleware/AuthToken");
const {hasPermissionAdmin, hasPermissionUser} = require("../middleware/roles");
const {requestLogger} = require("../config/logger");

// Controlador para criação de um usuário
async function createUser(user) {
  try {
    user.password = await bycrypt.hash(user.password, 10);
    return await User.create(user);
  } catch (error) {
    requestLogger.error('Erro ao criar usuário: ' + error.message);
    return {
      error: true,
      message: 'Erro ao criar usuário' + user.username,
      error_message: error.message,
    }
  }
}

// login
async function loginUser(identifier, password) {
    try {
        const user = await User.findOne({
        where: {
            [Op.or]: [
            { username: identifier },
            { email: identifier },
            ]
        }
        });
        if (!user) {
          requestLogger.error(`Usuário ${identifier} não encontrado`)
          return {
            error: true,
            message: `Usuário ${identifier} não encontrado`,
        };
        }
        const isValid = bycrypt.compare(password, user.password)

        if (!isValid) {
          requestLogger.error('Senha inválida')
          return {
            error: true,
            message: 'Senha inválida',
          }
        }
        // Gera o token
        const Token = TokenController.generateToken({ id: user.id, profile: user.profile });
        delete user.password;
        requestLogger.info(`Usuário ${identifier} autenticado com sucesso`);
        return {
            error: false,
            message: 'Usuário autenticado com sucesso',
            token: Token,
            user: user
        };
    } catch (error) {
        return {
            error: true,
            message: 'Erro ao autenticar usuário',
            error_message: error.message,
        };
    }
}

// Controlador para obter todos os usuários
async function getAllUsers(token) {
    if (hasPermissionAdmin(token)) {
        try {
            requestLogger.info('todos os usuários enviados com sucesso');
            return await User.findAll();
        } catch (error) {
            requestLogger.error('Erro ao obter usuários: ' + error.message);
            throw new Error('Erro ao obter usuários');
        }
    } else {
        requestLogger.error(`Usuário não tem permissão para listar usuários`);
        return {mensagem: 'Usuário não tem permissão para listar usuários'}
    }
}

// Controlador para obter um usuário pelo ID
async function getUserById(token, id) {
  if (hasPermissionUser(token, id)) {
    try {
      const user = await User.findByPk(id);
      if (user) {
        requestLogger.info(`Usuário ${id} enviado com sucesso`);
        return user;
      } else {
        requestLogger.error(`Usuário ${id} não encontrado`);
        throw new Error(`Usuário ${id} não encontrado`);
      }
    } catch (error) {
      requestLogger.error('Erro ao obter usuário: ' + error.message);
      throw new Error('Erro ao obter usuário');
    }
  }
}

// Controlador para atualização de um usuário
async function updateUser(token, id, user) {
  try {
    const userFound = await User.findByPk(id);
    if (userFound) {
      if (hasPermissionAdmin(token) || hasPermissionUser(token, id)) {
        // Remove o parâmetro 'profile' do objeto 'user' se o usuário não tiver perfil de administrador
        if (!hasPermissionAdmin(token)) {
          delete user.profile;
          requestLogger.info(`Usuário ${id} não tem permissão para editar o perfil`);
        }

        const updatedUser = await userFound.update(user);
        requestLogger.info(`Usuário ${id} atualizado com sucesso`);
        return updatedUser;
      } else {
        requestLogger.error(`Usuário ${id} não tem permissão para editar este usuário`);
        throw new Error('Usuário não tem permissão para editar este usuário');
        return {
            error: true,
            message: `Usuário ${user.username} não tem permissão para editar este usuário`,
        }
      }
    } else {
      requestLogger.error(`Usuário ${id} não encontrado`);
      throw new Error(`Usuário ${id} não encontrado`);
      return {
        error: true,
        message: `Usuário ${id} não encontrado`,
      }
    }
  } catch (error) {
    requestLogger.error('Erro ao atualizar usuário: ' + error.message);
    throw new Error('Erro ao atualizar usuário');
    return {
        error: true,
        message: 'Erro ao atualizar usuário',
    }
  }
}



async function deleteUser(token, id) {
    if(hasPermissionUser(token, id)) {
        try {
            const userFound = await User.findByPk(id);
            if (userFound) {
                await userFound.destroy();
                requestLogger.info(`Usuário ${id} deletado com sucesso`);
                return {
                    error: false,
                    message: `Usuário ${id} deletado com sucesso`
                }
            } else {
                requestLogger.error(`Usuário ${id} não encontrado`);
                throw new Error(`Usuário ${id} não encontrado`);
            }
        } catch (error) {
            requestLogger.error('Erro ao deletar usuário: ' + error.message);
            throw new Error('Erro ao deletar usuário');
        }
    }
}

module.exports = {
    createUser,
    getAllUsers,
    loginUser,
    getUserById,
    updateUser,
    deleteUser
}