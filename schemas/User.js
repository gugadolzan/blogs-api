const Joi = require('joi');

module.exports = Joi.object().keys({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  // .uri() requires a valid RFC 3986 URI
  image: Joi.string().uri().required(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
});
