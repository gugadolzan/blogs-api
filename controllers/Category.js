const rescue = require('express-rescue');

const { CODES, payloadValidator } = require('../helpers');
const schemas = require('../schemas');
const services = require('../services');

const create = rescue(async (req, res) => {
  const { name } = req.body;

  payloadValidator(schemas.Category, { name });

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
