const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const { body, validationResult } = require('express-validator');
const { token } = require("morgan");

const router = express.Router();

//--------------------------------------------------------------criar--------------------------------------------------------------
router.post('/create', [
    body('name').notEmpty().withMessage('O campo nome é obrigatório'),
    body('description').notEmpty().withMessage('O campo descrição é obrigatório')
], async (req, res) => {
    const { name, description } = req.body;
    let token = req.headers.authorization;
    const category = await CategoryController.create(token, { name, description });
    res.json({ category });
});

//--------------------------------------------------------------listar--------------------------------------------------------------

router.post('/get', async (req, res) => {
    let consult = req.body;
    let categories = await CategoryController.get(consult);
    res.json(categories);
});

//--------------------------------------------------------------atualizar--------------------------------------------------------------

router.put('/:id', async (req, res) => {
    let token = req.headers.authorization;
    let id = req.params.id;
    let data = req.body;
    let category = await CategoryController.updateCategory(token, id, data);
    res.json(category);
});

//--------------------------------------------------------------deletar--------------------------------------------------------------

router.delete('/:id', async (req, res) => {
    let token = req.headers.authorization;
    let id = req.params.id;
    let category = await CategoryController.deleteCategory(id, token);
    res.json(category);
});

module.exports = router;