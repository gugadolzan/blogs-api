require('dotenv').config();

const jwt = require('jsonwebtoken');

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};
const secret = process.env.JWT_SECRET;

const generate = (data) => jwt.sign(data, secret, jwtConfig);

const validate = (token) => jwt.verify(token, secret, jwtConfig);

module.exports = {
  generate,
  validate,
};
