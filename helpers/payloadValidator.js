const throwNewError = require('./throwNewError');

module.exports = (schema, value, options) => {
  const { error } = schema.validate(value, options);

  if (error) throwNewError('joi', error);
};
