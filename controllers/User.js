const rescue = require('express-rescue');

const { generate, validate } = require('../helpers/jwt');
const codes = require('../helpers/statusCodes');
const throwNewError = require('../helpers/throwNewError');
const schemas = require('../schemas');
const services = require('../services');

const create = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const payload = { displayName, email, password, image };

  const { error } = schemas.User.validate(payload);

  if (error) throw error;

  await services.User.create(payload);

  const token = generate(payload);

  res.status(codes.CREATED).json({ token });
});

const getAll = rescue(async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) throwNewError('tokenNotFound');
  
  // If authorization header is not present or is invalid
  // an error will be thrown by the validate function
  // Refer to ../helpers/jwt.js
  await validate(authorization);

  const users = await services.User.getAll();

  res.status(codes.OK).json(users);
});

module.exports = {
  create,
  getAll,
};
