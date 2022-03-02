const rescue = require('express-rescue');

const { CODES, jwt, payloadValidator } = require('../helpers');
const schemas = require('../schemas');
const services = require('../services');

/**
 * @description Create a new user
 * @method POST
 * @path /user
 */
const create = rescue(async (req, res) => {
  const { displayName, email, image, password } = req.body;

  payloadValidator(schemas.User, { displayName, email, image, password });

  await services.User.create({ displayName, email, image, password });

  const token = jwt.generate({ displayName, email, image, password });

  res.status(CODES.CREATED).json({ token });
});

/**
 * @description Get all users
 * @method GET
 * @path /user
 */
const getAll = rescue(async (_req, res) => {
  const users = await services.User.getAll();

  res.status(CODES.OK).json(users);
});

/**
 * @description Get a user by id
 * @method GET
 * @path /user/:id
 */
const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const user = await services.User.getById(id);

  res.status(CODES.OK).json(user);
});

/**
 * @description Delete a user by id
 * @method DELETE
 * @path /user/:id
 */
const remove = rescue(async (req, res) => {
  const { id } = req.user;

  await services.User.remove(id);

  res.status(CODES.NO_CONTENT).end();
});

module.exports = {
  create,
  getAll,
  getById,
  remove,
};
