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
 * @description Get a user by email
 * @param {string} email
 * @returns {Promise<object>}
 */
const getByEmail = async (email) => {
  const user = await models.User.findOne({
    attributes: { exclude: ['password'] },
    where: { email },
  });

  if (!user) throwNewError('invalidFields');

  return user.dataValues;
};

/**
 * @description Get a user by id
 * @param {string} id
 * @returns {Promise<object>}
 */
const getById = async (id) => {
  const user = await models.User.findOne({
    attributes: { exclude: ['password'] },
    where: { id },
  });

  if (!user) throwNewError('userNotFound');

  return user.dataValues;
};

/**
 * @description Delete a user by id
 * @param {string} id
 */
const remove = async (id) => {
  await models.User.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getByEmail,
  getById,
  remove,
};
