const rescue = require('express-rescue');

const { codes, jwt } = require('../helpers');
const schemas = require('../schemas');
const services = require('../services');

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  const payload = { email, password };

  const { error } = schemas.Login.validate(payload);

  if (error) throw error;

  await services.Login.login(email);

  const token = jwt.generate(payload);

  res.status(codes.OK).json({ token });
});

module.exports = {
  login,
};
