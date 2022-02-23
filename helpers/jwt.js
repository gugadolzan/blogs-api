require('dotenv').config();

const jwt = require('jsonwebtoken');

const throwNewError = require('./throwNewError');

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};
const secret = process.env.JWT_SECRET;

const generate = (data) => jwt.sign(data, secret, jwtConfig);

// If a callback is supplied, function acts asynchronously
// Refer to https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
const validate = async (token) =>
  jwt.verify(token, secret, jwtConfig, (err, decoded) =>
    (err ? throwNewError('JsonWebTokenError') : decoded));

module.exports = {
  generate,
  validate,
};
