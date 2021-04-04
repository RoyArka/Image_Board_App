const mysql = require("mysql");
const password = process.env.DB_KEY;

// eslint-disable-next-line no-unused-vars
const remoteDB = {
  host: "localhost",
  user: "michealo_admin",
  password: password,
  database: "michealo_COMP4537Asgn1",
};

const localDB = {
  host: "localhost",
  user: "admin",
  password: password,
  database: "COMP4537TermProject",
};

const connection = mysql.createPool({
  host: localDB.host,
  user: localDB.user,
  password: localDB.password,
  database: localDB.database,
  connectionLimit: 5,
});

module.exports = connection;
