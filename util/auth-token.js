const jwt = require("jsonwebtoken");
const config = require("../config");
const key = config.JWT_KEY;

const createToken = (username, userID) => {
  return jwt.sign(
    {
      username: username,
      userID: userID,
    },
    key,
    {
      expiresIn: "1h",
    },
  );
};

module.exports = {
  createToken,
};
