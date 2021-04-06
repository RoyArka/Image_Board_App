const connection = require("./db-connection");

const incrementEndpointStats = async (endpoint, method) => {
  insertIfNotExists(endpoint, method);
  const query = `
    UPDATE Statistics
    SET Requests = Requests + 1
    WHERE Endpoint = '${endpoint}'
    AND Method = '${method}'
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

const insertIfNotExists = (endpoint, method) => {
  const query = `
    INSERT INTO Statistics (Method, Endpoint, Requests)
    SELECT * FROM (SELECT '${method}', '${endpoint}', 1) as tmp
    WHERE NOT EXISTS (
      SELECT Endpoint, Method
      FROM Statistics
      WHERE Endpoint = '${endpoint}'
      AND Method = '${method}'
    ) LIMIT 1;
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

const selectAllFromStats = () => {
  const query = "SELECT * FROM Statistics";
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
  incrementEndpointStats,
  selectAllFromStats,
};
