const connection = require("./db-connection");

const createLocation = async (name) => {
  const query = `INSERT INTO Location(Name) values ('${name}')`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

const deleteLocationByName = async (name) => {
  const query = `DELETE FROM Location WHERE Name = ${name}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

const selectAllFromLocation = () => {
  const query = "SELECT * FROM Location";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  createLocation,
  deleteLocationByName,
  selectAllFromLocation,
};
