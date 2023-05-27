const express = require("express");
const UserController = require("../controllers/UserController");
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Rota para criar um novo usuário
router.post('/', [
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

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const login = await UserController.loginUser(username, password);
    res.json({login});
});

// Rota para obter todos os usuários
router.get('/', async (req, res) => {
  // Lógica para obter todos os usuários
  const users = await UserController.getAllUsers(req, res);
  res.json({
    message: 'Listar todos os usuários',
    users: users
  });
});

// Rota para obter um usuário pelo ID
router.get('/:id', (req, res) => {
  const reqId = req.params.id;

  res.json({ message: 'Obter usuário pelo ID',
                   id: reqId});
});

// Rota para atualizar um usuário pelo ID
router.put('/:id', [
  body('nome').notEmpty().withMessage('O campo nome é obrigatório'),
  body('email').isEmail().withMessage('O campo email deve ser um endereço de e-mail válido'),
], (req, res) => {
  const reqId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Se os dados forem válidos, continua com a lógica da rota
  // ...

  res.json({ message: 'Atualizar usuário pelo ID' });
});

// Rota para excluir um usuário pelo ID
router.delete('/:id', (req, res) => {
  // Lógica para excluir um usuário pelo ID
  // ...

  res.json({ message: 'Excluir usuário pelo ID' });
});

module.exports = router;