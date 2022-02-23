const { User } = require('../models');

const codes = require('../helpers/statusCodes');

const create = async (payload) => {
  const user = await User.findOne({ where: { email: payload.email } });

  if (user) {
    const error = new Error('User already registered');
    error.status = codes.CONFLICT;
    throw error;
  }

  await User.create(payload);
};

module.exports = {
  create,
};
