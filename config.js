const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  DB_KEY: process.env.DB_KEY,
  PORT: process.env.PORT,
};
