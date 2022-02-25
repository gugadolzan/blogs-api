const rescue = require('express-rescue');

const { CODES, jwt, payloadValidator } = require('../helpers');
const schemas = require('../schemas');
const services = require('../services');

/**
 * @description Login a user
 * @method POST
 * @path /login
 */
const login = rescue(async (req, res) => {
  const { email, password } = req.body;

  payloadValidator(schemas.Login, { email, password });

  await services.Login.login(email);

  const token = jwt.generate({ email, password });

  res.status(CODES.OK).json({ token });
});

module.exports = {
  login,
};
