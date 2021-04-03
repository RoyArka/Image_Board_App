const db = require("./db-connection");

const update = ({ id, quote, author }) => {
  const query = `UPDATE QUOTES SET QUOTE = "${quote}", AUTHOR = "${author}" WHERE ID = ${id}`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
};

module.exports = {
  update,
};
