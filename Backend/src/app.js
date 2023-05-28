const express = require('express');
const cors = require('cors');
const sequelize = require('../config/sequelize');
const routes = require('../routes/index');
const {User, Course, Category, Registration, Certificate} = require('../models/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// Conexão com o banco de dados

sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado ao Banco de Dados com sucesso!');
    return sequelize.sync({ force: false }); // Sincroniza os modelos com o banco de dados
  })
  .then(() => {
    console.log('Modelos sincronizados com o Banco de Dados!');
    app.listen(3000, () => {
      console.log('Servidor iniciado na porta 3000');
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao Banco de Dados:', error);
  });