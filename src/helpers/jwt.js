require('dotenv').config();

const jwt = require('jsonwebtoken');

const throwNewError = require('./throwNewError');

const options = {
  algorithm: 'HS256',
  expiresIn: '1d',
};
const secret = process.env.JWT_SECRET;

const generate = (payload) => jwt.sign(payload, secret, options);

// If a callback is supplied, function acts asynchronously
// Refer to https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
const validate = async (token) =>
  jwt.verify(token, secret, options, (err, decoded) =>
    (err ? throwNewError('JsonWebTokenError') : decoded));

module.exports = {
  generate,
  validate,
};
