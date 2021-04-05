const connection = require("./db-connection");

const updateUsernameByUserId = ({ id, username }) => {
  const query = `
    UPDATE User
    SET Username = "${username}"
    WHERE ID = ${id}
  `;
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

const updatePasswordByUserId = ({ id, password }) => {
  const query = `
    UPDATE User
    SET Password = "${password}"
    WHERE ID = ${id}
  `;
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

const getUserById = (id) => {
  const query = `
    SELECT Username, Password, DateJoined, Admin
    FROM User
    WHERE ID = ${id}
  `;
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

const registerUser = ({ dateJoined, isAdmin, password, username }) => {
  const query = `
    INSERT INTO User(Username, Password, DateJoined, Admin)
    VALUES ('${username}', '${password}', ${dateJoined}, ${isAdmin})
  `;

  const ERROR_DUPLICATE_ENTRY = "ER_DUP_ENTRY";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === ERROR_DUPLICATE_ENTRY) resolve(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  getUserById,
  registerUser,
  updatePasswordByUserId,
  updateUsernameByUserId,
};
