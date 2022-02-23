const rescue = require('express-rescue');

const { generate } = require('../helpers/jwt');
const codes = require('../helpers/statusCodes');
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

module.exports = {
  create,
};
