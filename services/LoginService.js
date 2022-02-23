const { User } = require('../models');

const codes = require('../helpers/statusCodes');

const login = async (payload) => {
  const user = await User.findOne({ where: { email: payload.email } });

  if (!user) {
    const error = new Error('Invalid fields');
    error.status = codes.BAD_REQUEST;
    throw error;
  }

  // await User.create(payload);
};

module.exports = {
  login,
};
