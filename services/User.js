const { throwNewError } = require('../helpers');
const models = require('../models');

/**
 * @description Create a new user
 * @param {{ displayName: string, email: string, image: string, password: string }} payload
 */
const create = async ({ displayName, email, image, password }) => {
  const user = await models.User.findOne({ where: { email } });

  // If user already exists
  // then throw an error
  if (user) throwNewError('userConflict');

  await models.User.create({ displayName, email, image, password });
};

/**
 * @description Get all users
 * @returns {Promise<object[]>}
 */
const getAll = async () => {
  const users = await models.User.findAll();

  const result = users.map((user) => user.dataValues);

  return result;
};

/**
 * @description Get a user by id
 * @param {{ id: string }} payload
 * @returns {Promise<object>}
 */
const getById = async ({ id }) => {
  const user = await models.User.findOne({ where: { id } });

  if (!user) throwNewError('userNotFound');

  // Remove password from the data
  const { password, ...result } = user.dataValues;

  // and return the user data without password
  return result;
};

/**
 * @description Delete a user by id
 * @param {{ email: string }} payload
 */
const remove = async ({ email }) => {
  const { id } = await models.User.findOne({ where: { email } });

  await models.User.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};
