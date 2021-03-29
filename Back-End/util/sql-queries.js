const mysql = require("mysql");
const formatResult = require("./format-result");

const remoteDB = {
  host: "localhost",
  user: "michealo_admin",
  password: "Initial1",
  database: "michealo_COMP4537Asgn1"
};

const localDB = {
  host: "localhost",
  user: "admin",
  password: "Initial1",
  database: "COMP4537Asgn1"
};

const db = mysql.createPool({
  host: localDB.host,
  user: localDB.user,
  password: localDB.password,
  database: localDB.database,
  connectionLimit : 5,
});

const deleteRowFromTable = (id) => {
  const query = `DELETE FROM QUOTES WHERE ID = ${id}`
  db.query(query, (err, res) => {
      if (err) throw err;
      console.log(res);
  });
}

const insert = ({ quote, author }) => {
  const query = `INSERT INTO QUOTES(QUOTE, AUTHOR) values ('${quote}', '${author}')`;
  db.query(query, (err, res) => {
      if(err) throw err;
      console.log(res);
  });
}

const selectAll = ({ res, isAdmin }) => {
  const query = "SELECT * FROM QUOTES";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }

    if (isAdmin) {
      res.json(result);
      return;
    }

    res.end(formatResult(result));
    return;
  });
}

const selectLastRow = ({ res, isGetRequest }) => {
  const query = `SELECT * FROM QUOTES ORDER BY ID DESC LIMIT 1`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    if (!isGetRequest) {
      console.log("SELECT LAST ROW JSON:", result);
      res.json(result);
      return;
    }

    res.end(formatResult(result));
  });
}

const update = ({ id, quote, author }) => {
  const query = `UPDATE QUOTES SET QUOTE = "${quote}", AUTHOR = "${author}" WHERE ID = ${id}`;
  db.query(query, (err, res) => {
      if(err) throw err;
      console.log(res);
  });
}

module.exports = {
  deleteRowFromTable,
  insert,
  update,
  selectAll,
  selectLastRow,
}