const { User } = require('../models');

const create = async (payload) => {
  const user = await User.findOne({ where: { email: payload.email } });

  if (user) {
    const error = new Error('User already registered');
    error.status = 409;
    throw error;
  }

  await User.create(payload);
};

module.exports = {
  create,
};
