const { User } = require('../models');

const { throwNewError } = require('../helpers');

const login = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throwNewError('invalidFields');
};

module.exports = {
  login,
};
