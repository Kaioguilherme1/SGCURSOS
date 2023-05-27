const database = {
  dialect: "postgres",
  host: "192.168.20.4", // process.env.DB_HOST_LOCAL,
  port: 5432,
  database: "university", // process.env.DB_DATABASE,
  username: "postgres", //process.env.DB_USER,
  password: "1234" //process.env.DB_PASSWORD,
};

module.exports = database;