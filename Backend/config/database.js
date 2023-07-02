const {databaseLogger} = require("../config/logger");

const database = {
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  logging: (message) => {
    databaseLogger.info(message);
  }
};

module.exports = database;