const throwNewError = require('./throwNewError');

/**
 * @description Validate payload using Joi
 * @param {Object} schema
 * @param {Object} payload
 * @param {Object} options
 */
module.exports = (schema, value, options) => {
  const { error } = schema.validate(value, options);

  if (error) throwNewError('joi', error);
};
