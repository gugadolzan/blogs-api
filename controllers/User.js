const rescue = require('express-rescue');

const { codes, jwt, throwNewError } = require('../helpers');
const schemas = require('../schemas');
const services = require('../services');

const create = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const payload = { displayName, email, password, image };

  const { error } = schemas.User.validate(payload);

  if (error) throw error;

  await services.User.create(payload);

  const token = jwt.generate(payload);

  res.status(codes.CREATED).json({ token });
});

const getAll = rescue(async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) throwNewError('tokenNotFound');
  
  // If authorization header is not present or is invalid
  // an error will be thrown by the validate function
  // Refer to ../helpers/jwt.js
  await jwt.validate(authorization);

  const users = await services.User.getAll();

  res.status(codes.OK).json(users);
});

module.exports = {
  create,
  getAll,
};
