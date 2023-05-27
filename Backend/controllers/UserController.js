const User = require('../models/users_model');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../config/auth');
const {Op} = require("sequelize");
const TokenController = require("../middleware/AuthToken");

// Controlador para criação de um usuário
async function createUser(user) {
  try {
    user.password = await bycrypt.hash(user.password, 10);
    return await User.create(user);
  } catch (error) {
    return {
      error: true,
      message: 'Erro ao criar usuário',
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
          return {
            error: true,
            message: 'Usuário não encontrado',
        };
        }
        const isValid = await bycrypt.compare(password, user.password);
        if (!isValid) {
          return {
            error: true,
            message: 'Senha inválida',
          }
        }
        console.log(auth.secret);
        const Token = TokenController.generateToken({ id: user.id, profile: user.profile });

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
async function getAllUsers(req, res) {
  try {
    return await User.findAll();
  } catch (error) {
    throw new Error('Erro ao obter usuários');
  }
}

// Controlador para obter um usuário pelo ID
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter usuário', error });
  }
}

// Controlador para atualização de um usuário
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { username, password, email, name, number, image_path, profile, is_suspended } = req.body;
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.password = password;
      user.email = email;
      user.name = name;
      user.number = number;
      user.image_path = image_path;
      user.profile = profile;
      user.is_suspended = is_suspended;
      await user.save();
      res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
}

module.exports = {
    createUser,
    getAllUsers,
    loginUser,
    getUserById,
    updateUser
}