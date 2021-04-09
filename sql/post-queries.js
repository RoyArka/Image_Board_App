const connection = require("./db-connection");

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

const deletePostById = (id) => {
  const query = `
    DELETE
    FROM Post
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

const updatePostById = (id, message) => {
  const query = `
    UPDATE Post
    SET Message = '${message}'
    WHERE ID = id
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

module.exports = {
  createPost,
  deletePostById,
  getPostsByLocationName,
  getPostsByUsername,
  updatePostById,
};
