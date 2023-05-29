const express = require("express");
const UserController = require("../controllers/UserController");
const { body, validationResult } = require('express-validator');
const roles = require("../middleware/roles");

const router = express.Router();

//--------------------------------------------------------------register--------------------------------------------------------------

// Rota para criar um novo usuário
router.post('/register', [
  body('name').notEmpty().withMessage('O campo nome é obrigatório'),
  body('email').isEmail().withMessage('O campo email deve ser um endereço de e-mail válido'),
  body('username').notEmpty().withMessage('O campo username é obrigatório').isLength({max: 100}).withMessage('O campo username deve ter no máximo 100 caracteres',
  body('password').notEmpty().withMessage('O campo password é obrigatório').isLength({ min: 8 }).withMessage('O campo password deve ter no mínimo 6 caracteres'))
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

 const { username, password, email, name, number, image_path, profile, is_suspended } = req.body;
  // Criação do usuário utilizando os dados recebidos
  const user = await UserController.createUser({
    username,
    password,
    email,
    name,
    number,
    image_path,
    profile,
    is_suspended
  });
  res.json({user});
});

//--------------------------------------------------------------login--------------------------------------------------------------

// rota para login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const login = await UserController.loginUser(username, password);
    res.json({login});
});

//--------------------------------------------------------------get all users--------------------------------------------------------------

// Rota para obter todos os usuários
router.get('/getAll', async (req, res) => {
  // Lógica para obter todos os usuários
  const token = req.headers.authorization;
  const users = await UserController.getAllUsers(token);
  res.json({
    message: 'Listar todos os usuários',
    users: users
  });
});

//--------------------------------------------------------------get user by id--------------------------------------------------------------

// Rota para obter um usuário pelo ID
router.get('/:id', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const reqId = req.params.id;
        const response = await UserController.getUserById(token, reqId);
        res.json({response});
    }catch (error) {
        console.log(error);
        res.json({
            error: true,
            message: 'Erro ao obter usuário' + error,
        });
    }
});

//--------------------------------------------------------------update user by id--------------------------------------------------------------

// Rota para atualizar um usuário pelo ID
router.put('/:id', async (req, res) => {
   try {
    const token = req.headers.authorization;
    const reqId = req.params.id;
    const user = req.body;
    const response = await UserController.updateUser(token, reqId, user);
    res.json({response});
   }catch (error) {
    console.log(error);
    res.json({
        error: true,
        message: 'Erro ao atualizar usuário' + error,
    });
   }
});


//--------------------------------------------------------------delete user by id--------------------------------------------------------------

// Rota para excluir um usuário pelo ID
router.delete('/:id', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const reqId = req.params.id;
        const response = await UserController.deleteUser(token, reqId);
        res.json({response});
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            message: 'Erro ao excluir usuário' + error,
        });
    }
});

module.exports = router;