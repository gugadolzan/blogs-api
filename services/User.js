const { User } = require('../models');

const { throwNewError } = require('../helpers');

const create = async (payload) => {
  const user = await User.findOne({ where: { email: payload.email } });

  if (user) throwNewError('userConflict');

  await User.create(payload);
};

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id } });

  if (!user) throwNewError('userNotFound');

  // Remove password from the data
  const { password, ...userData } = user.dataValues;

  // and return the user data without password
  return userData;
};

const remove = async (email) => {
  const { id } = await User.findOne({ where: { email } });

  await User.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};
