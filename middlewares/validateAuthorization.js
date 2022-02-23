const rescue = require('express-rescue');

const { jwt, throwNewError } = require('../helpers');

module.exports = rescue(async (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throwNewError('tokenNotFound');

  // If authorization header is invalid
  // an error will be thrown by the validate function
  // Refer to ../helpers/jwt.js
  await jwt.validate(authorization);

  next();
});