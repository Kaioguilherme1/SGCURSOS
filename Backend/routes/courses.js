const express = require("express");
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Rota para criar um novo curso
router.post('/', [
  body('name').notEmpty().withMessage('O campo nome é obrigatório'),
  body('description').notEmpty().withMessage('O campo descrição é obrigatório'),
  // Outras validações para os campos do curso
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Se os dados forem válidos, continua com a lógica da rota
  // ...

  res.json({ message: 'Curso criado com sucesso!' });
});

// Rota para obter todos os cursos
router.get('/', (req, res) => {
  // Lógica para obter todos os cursos
  // ...
  res.json({ message: 'Listar todos os cursos' });
});

// Rota para obter um curso pelo ID
router.get('/:id', (req, res) => {
  const courseId = req.params.id;

  // Lógica para obter um curso pelo ID
  // ...

  res.json({ message: 'Obter curso pelo ID', id: courseId });
});

// Rota para atualizar um curso pelo ID
router.put('/:id', [
  body('name').notEmpty().withMessage('O campo nome é obrigatório'),
  body('description').notEmpty().withMessage('O campo descrição é obrigatório'),
  // Outras validações para os campos do curso
], (req, res) => {
  const courseId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Se os dados forem válidos, continua com a lógica da rota
  // ...

  res.json({ message: 'Atualizar curso pelo ID' });
});

// Rota para excluir um curso pelo ID
router.delete('/:id', (req, res) => {
  const courseId = req.params.id;

  // Lógica para excluir um curso pelo ID
  // ...

  res.json({ message: 'Excluir curso pelo ID' });
});

module.exports = router;
