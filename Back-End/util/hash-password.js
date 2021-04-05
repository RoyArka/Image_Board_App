const bcrypt = require("bcrypt");
const saltRounds = 10; // bcrypt salting requirement

const comparePasswords = async (password, hash) => {
  bcrypt.compare(password, hash).then((result) => {
    return result;
  });
};

const hashPassword = async (password) => {
  bcrypt.hash(password, saltRounds).then((hash) => {
    return hash;
  });
};

module.exports = {
  comparePasswords,
  hashPassword,
};
