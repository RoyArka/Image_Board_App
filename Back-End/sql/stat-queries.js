const connection = require("./db-connection");

const incrementEndpointStatistics = async (endpoint, method) => {
  const query = `
    UPDATE Statistics
    SET Requests = Requests + 1
    WHERE Method = '${endpoint}'
    AND Method = ${method}
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

const selectAllFromStatistics = () => {
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
  incrementEndpointStatistics,
  selectAllFromStatistics,
};
