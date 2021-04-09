const jwt = require("jsonwebtoken");
const config = require("../config");
const key = config.JWT_KEY;
const statusCode = require("../http/status-codes");
const failedAuth = "Unauthorized Client, Authentication Failed";

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, key);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(statusCode.UNAUTHORIZED).json({
      message: failedAuth,
    });
  }
};
