const connection = require("./db-connection");

const updatePost = ({ id, quote, author }) => {
  // TODO: create proper query for update
  const query = `UPDATE QUOTES SET QUOTE = "${quote}", AUTHOR = "${author}" WHERE ID = ${id}`;
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

const getPostsByLocationName = (locationName) => {
  const query = `
    SELECT * FROM Post
    WHERE LocationName = '${locationName}'
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

const getPostsByUsername = (username) => {
  const query = `
    SELECT * FROM Post
    WHERE Username = '${username}'
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

const createPost = async ({ username, imagePath, locationName, message }) => {
  const sqlData = {
    Username: username,
    ImagePath: imagePath,
    LocationName: locationName,
    Message: message,
  };

  const query = `
    INSERT INTO Post SET ?
  `;
  return new Promise((resolve, reject) => {
    connection.query(query, sqlData, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  createPost,
  getPostsByLocationName,
  getPostsByUsername,
  updatePost,
};
