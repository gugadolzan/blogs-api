const Joi = require('joi');

module.exports = Joi.object().keys({
  // Tip from Marcello "Atharr" Alves for conditional validation
  categoryIds: Joi.when(Joi.ref('$method'), {
    is: 'PUT',
    then: Joi.array().forbidden().messages({
      'any.unknown': 'Categories cannot be edited',
    }),
    otherwise: Joi.array().items(Joi.number()).required(),
  }),
  content: Joi.string().required(),
  title: Joi.string().required(),
});
