const express = require('express');
const cors = require('cors');
const sequelize = require('../config/sequelize');
const routes = require('../routes/index');
const morgan = require('morgan');
const {apiLogger} = require("../config/logger");
const {createSQLFunctions} = require("../models/functions_models");


const app = express();


// Utilizar o logger do winston para registrar os logs da api
app.use((req, res, next) => {
  const { ip, method, originalUrl, query } = req;
  const queryStr = JSON.stringify(query);
  apiLogger.info(`Requisição recebida: ${ip} (${method} -> ${originalUrl}: content[query: ${queryStr}])`);
  next();
});
app.use((err, req, res, next) => {
  // Registrar o erro no logger como nível de erro (error)
  apiLogger.error('Erro na API:', err);

  // Enviar uma resposta de erro para o cliente
  res.status(500).json({ error: 'Ocorreu um erro na API' });
});

app.use(cors());
app.use(express.json());
app.use(routes);

// Conexão com o banco de dados

sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado ao Banco de Dados com sucesso!');
    return sequelize.sync({ force: false }); // Sincroniza os modelos com o banco de dados
  }).then(() => {
    console.log('Modelos sincronizados com o Banco de Dados!');

    // Chama a função createSQLFunctions para executar o SQL personalizado
    return createSQLFunctions();
  })
  .then(() => {

    app.listen(3000, () => {
      console.log('Servidor iniciado na porta 3000');
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao Banco de Dados:', error);
  });

