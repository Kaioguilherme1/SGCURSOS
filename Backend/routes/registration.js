const express = require("express");
const registrationController = require("../controllers/RegistrationController");
const { body, validationResult } = require('express-validator');
const { token } = require("morgan");

const router = express.Router();

//--------------------------------------------------------------criar--------------------------------------------------------------
router.post('/register', [
  body('id').notEmpty().withMessage('O campo ID é obrigatório'),
  body('user_id').notEmpty().withMessage('O campo user_id é obrigatório'),
  body('course_id').notEmpty().withMessage('O campo course_id é obrigatório'),
], async (req, res) => {
  const { id, user_id, course_id, progress_time, final_grade } = req.body;
  let token = req.headers.authorization;
  const registration = await registrationController.createRegistration(token, {
    id,
    user_id,
    course_id,
  });
  res.json({ registration });
});

//--------------------------------------------------------------listar--------------------------------------------------------------

router.post('/get', async (req, res) => {
  let token = req.headers.authorization;
  let consult = req.body;
  const registrations = await registrationController.getRegistrations(token, consult);
  res.json(registrations);
});

//--------------------------------------------------------------atualizar--------------------------------------------------------------

router.put('/:id', async (req, res) => {
  let token = req.headers.authorization;
  let id = req.params.id;
  let data = req.body;
  const registration = await registrationController.updateRegistration(id, token, data);
  res.json(registration);
});

//--------------------------------------------------------------deletar--------------------------------------------------------------

router.delete('/:id', async (req, res) => {
  let token = req.headers.authorization;
  let id = req.params.id;
  const registration = await registrationController.deleteRegistration(id, token);
  res.json(registration);
});

module.exports = router;
