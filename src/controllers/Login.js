const rescue = require('express-rescue');

const { CODES, payloadValidator } = require('../helpers');
const schemas = require('../schemas');
const services = require('../services');

/**
 * @description Login a user
 * @method POST
 * @path /login
 */
const getToken = rescue(async (req, res) => {
  const { email, password } = req.body;

  payloadValidator(schemas.Login, { email, password });

  const token = await services.User.login({ email, password });

  res.status(CODES.OK).json({ token });
});

module.exports = {
  getToken,
};
