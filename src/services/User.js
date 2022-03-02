const argon2 = require('argon2');

const { jwt, throwNewError } = require('../helpers');
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

  const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });

  await models.User.create({
    displayName,
    email,
    image,
    password: hashedPassword,
  });
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
 * @description Login a user
 * @param {{ email: string, password: string }} payload
 * @returns {Promise<string>}
 */
const login = async ({ email, password }) => {
  const user = await models.User.findOne({ where: { email } });

  if (!user) throwNewError('invalidFields');

  const isPasswordValid = await argon2.verify(user.password, password, {
    type: argon2.argon2id,
  });

  if (!isPasswordValid) throwNewError('invalidFields');

  const token = jwt.generate({ email });

  return token;
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
  login,
  remove,
};
