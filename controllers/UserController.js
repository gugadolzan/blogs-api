const rescue = require('express-rescue');

const { generate } = require('../helpers/jwt');
const codes = require('../helpers/statusCodes');
const UserSchema = require('../schemas/UserSchema');
const UserService = require('../services/UserService');

const create = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const payload = { displayName, email, password, image };

  const { error } = UserSchema.validate(payload);

  if (error) throw error;

  await UserService.create(payload);

  const token = generate(payload);

  res.status(codes.CREATED).json({ token });
});

module.exports = {
  create,
};
