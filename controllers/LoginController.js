const rescue = require('express-rescue');

const { generate } = require('../helpers/jwt');
const codes = require('../helpers/statusCodes');
const LoginSchema = require('../schemas/LoginSchema');
const LoginService = require('../services/LoginService');

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  const payload = { email, password };

  const { error } = LoginSchema.validate(payload);

  if (error) throw error;

  await LoginService.login(payload);

  const token = generate(payload);

  res.status(codes.OK).json({ token });
});

module.exports = {
  login,
};
