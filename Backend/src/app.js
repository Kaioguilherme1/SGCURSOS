const express = require('express');
const cors = require('cors');
const sequelize = require('../config/sequelize');
const routes = require('../routes/index');
const {apiLogger} = require("../config/logger");
const migration = require('../migrations/root');
const fs = require("fs");
const https = require("https");

const app = express();
const port = process.env.API_PORT || 3000;
const protocol = process.env.API_PROTOCOL || 'http';
const domain = process.env.API_URL || 'localhost';

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
sequelize.authenticate().then(() => {
    console.log('Conectado ao Banco de Dados com sucesso!');

    return sequelize.sync({ force: false }); // Sincroniza os modelos com o banco de dados

  }).then(() => {

    console.log('Modelos sincronizados com o Banco de Dados!');

    // Criar o usuário root usando a migração
    return migration.up(sequelize.getQueryInterface(), sequelize);
  })
  .then(() => {

    if (protocol === 'https') {
      try {
        const privateKey = fs.readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`, 'utf8');
        const certificate = fs.readFileSync(`/etc/letsencrypt/live/${domain}/cert.pem`, 'utf8');
        const credentials = { key: privateKey, cert: certificate };

        const server = https.createServer(credentials, app);

        server.listen(port, () => {
          console.log(`Servidor HTTPS iniciado em https://${domain}:${port}`);
        });
      } catch (error) {
        console.error('Erro ao iniciar o servidor HTTPS:', error);
        console.log('certificado SSL não encontrado, iniciando servidor HTTP');

        app.listen(port, () => {
          console.log(`Servidor HTTP iniciado em http://${domain}:${port}`);
        });
      }
    } else {
      app.listen(port, () => {
        console.log(`Servidor HTTP iniciado em http://${domain}:${port}`);
      });
    }
  })
  .catch((error) => {
    console.error('Erro ao conectar ao Banco de Dados:', error);
  });

