const rescue = require('express-rescue');

const { CODES, jwt, throwNewError } = require('../helpers');
const schemas = require('../schemas');
const services = require('../services');

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  const payload = { email, password };

  const { error } = schemas.Login.validate(payload);

  if (error) throwNewError('joi', error);

  await services.Login.login(email);

  const token = jwt.generate(payload);

  res.status(CODES.OK).json({ token });
});

module.exports = {
  login,
};
