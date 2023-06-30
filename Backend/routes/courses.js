const express = require("express");
const CourseController = require("../controllers/CourseController");
const { body, validationResult } = require('express-validator');
const {token} = require("morgan");

const router = express.Router();

//--------------------------------------------------------------criar--------------------------------------------------------------
router.post('/register', [
    body('name').notEmpty().withMessage('O campo nome é obrigatório'),
    body('description').notEmpty().withMessage('O campo descrição é obrigatório'),
    body('category_id').notEmpty().withMessage('O campo categoria é obrigatório'),
    body('image_path').notEmpty().withMessage('O campo imagem é obrigatório'),
    body('start_date').notEmpty().withMessage('O campo data de início é obrigatório'),
    body('duration_hours').notEmpty().withMessage('O campo duração é obrigatório')
], async (req, res) => {
const { name, description,tags , category_id, image_path, start_date, duration_hours } = req.body;
    let token = req.headers.authorization;
    const course = await CourseController.createCourse(token ,{
        name,
        description,
        tags,
        category_id,
        image_path,
        start_date,
        duration_hours
    });
    res.json({course});
});

//--------------------------------------------------------------listar--------------------------------------------------------------

router.post('/get', async (req, res) => {
    let token = req.headers.authorization;
    let consult = req.body
    let courses = await CourseController.getCourses(token, consult);
    res.json(courses);
});

//--------------------------------------------------------------atualizar--------------------------------------------------------------

router.put('/:id', async (req, res) => {
    let token = req.headers.authorization;
    let id = req.params.id;
    let data = req.body;
    let course = await CourseController.updateCourse(id, token, data);
    res.json(courses);
});

//--------------------------------------------------------------deletar--------------------------------------------------------------

router.delete('/:id', async (req, res) => {
    let token = req.headers.authorization;
    let id = req.params.id;
    let course = await CourseController.deleteCourse(id, token);
    res.json(course);
});
module.exports = router;
