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

const createPost = async ({ userId, imagePath, locationName, message }) => {
  const sqlData = {
    UserID: userId,
    Image: imagePath,
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
  updatePost,
};
