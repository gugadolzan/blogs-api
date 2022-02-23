const Joi = require('joi');

module.exports = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
  // Algoritmo do colega Marcello "Atharr" Alves
  categoryIds: Joi.when(Joi.ref('$method'), {
    is: 'PUT',
    then: Joi.array().forbidden().messages({
      'any.unknown': 'Categories cannot be edited',
    }),
    otherwise: Joi.array().items(Joi.number()).required(),
  }),
});
