const express = require("express");
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Rota para criar um novo usuário
router.post('/users', [
  body('nome').notEmpty().withMessage('O campo nome é obrigatório'),
  body('email').isEmail().withMessage('O campo email deve ser um endereço de e-mail válido'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Se os dados forem válidos, continua com a lógica da rota
  // ...

  res.json({ message: 'Usuário criado com sucesso!' });
});

// Rota para obter todos os usuários
router.get('/users', (req, res) => {
  // Lógica para obter todos os usuários
  // ...
  res.json({ message: 'Listar todos os usuários' });
});

// Rota para obter um usuário pelo ID
router.get('/users/:id', (req, res) => {
  // Lógica para obter um usuário pelo ID
  // ...

  res.json({ message: 'Obter usuário pelo ID' });
});

// Rota para atualizar um usuário pelo ID
router.put('/users/:id', [
  body('nome').notEmpty().withMessage('O campo nome é obrigatório'),
  body('email').isEmail().withMessage('O campo email deve ser um endereço de e-mail válido'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Se os dados forem válidos, continua com a lógica da rota
  // ...

  res.json({ message: 'Atualizar usuário pelo ID' });
});

// Rota para excluir um usuário pelo ID
router.delete('/users/:id', (req, res) => {
  // Lógica para excluir um usuário pelo ID
  // ...

  res.json({ message: 'Excluir usuário pelo ID' });
});

module.exports = router;