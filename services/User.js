const { User } = require('../models');

const throwNewError = require('../helpers/throwNewError');

const create = async (payload) => {
  const user = await User.findOne({ where: { email: payload.email } });

  if (user) throwNewError('alreadyRegistered');

  await User.create(payload);
};

module.exports = {
  create,
};
