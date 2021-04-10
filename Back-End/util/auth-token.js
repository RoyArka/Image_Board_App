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
      //time till token expires since creation
      expiresIn: "5 days",
    },
  );
};

module.exports = {
  createToken,
};
