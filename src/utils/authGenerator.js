const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT;

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}

module.exports = { createToken };
