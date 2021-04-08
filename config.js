const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  DB_KEY: process.env.DB_KEY,
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
};
