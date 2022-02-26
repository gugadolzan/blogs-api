const { throwNewError } = require('../helpers');
const models = require('../models');

/**
 * @description Login a user
 * @param {string} email
 */
const login = async (email) => {
  const user = await models.User.findOne({ where: { email } });

  // If user not found
  // then throw an error
  if (!user) throwNewError('invalidFields');
};

module.exports = {
  login,
};
