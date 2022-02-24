const rescue = require('express-rescue');

const { codes, jwt } = require('../helpers');
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

const getAll = rescue(async (_req, res) => {
  const users = await services.User.getAll();

  res.status(codes.OK).json(users);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const user = await services.User.getById(id);

  res.status(codes.OK).json(user);
});

const remove = rescue(async (req, res) => {
  const { email } = req;

  await services.User.remove(email);

  res.status(codes.NO_CONTENT).end();
});

module.exports = {
  create,
  getAll,
  getById,
  remove,
};
