const rescue = require('express-rescue');

const { codes } = require('../helpers');
const schemas = require('../schemas');
const services = require('../services');

const create = rescue(async (req, res) => {
  const { name } = req.body;

  const { error } = schemas.Category.validate({ name });

  if (error) throw error;

  const category = await services.Category.create(name);

  res.status(codes.CREATED).json(category);
});

module.exports = {
  create,
};
