const rescue = require('express-rescue');

const { CODES, throwNewError } = require('../helpers');
const schemas = require('../schemas');
const services = require('../services');

const create = rescue(async (req, res) => {
  const { name } = req.body;

  const { error } = schemas.Category.validate({ name });

  if (error) throwNewError('joi', error);

  const category = await services.Category.create(name);

  res.status(CODES.CREATED).json(category);
});

const getAll = rescue(async (_req, res) => {
  const categories = await services.Category.getAll();

  res.status(CODES.OK).json(categories);
});

module.exports = {
  create,
  getAll,
};
