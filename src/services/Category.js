const { throwNewError } = require('../helpers');
const models = require('../models');

/**
 * @description Create a new category
 * @param {{ name: string }} payload
 * @returns {Promise<object>}
 */
const create = async ({ name }) => {
  const category = await models.Category.findOne({ where: { name } });

  if (category) throwNewError('categoryConflict');

  const { null: id, dataValues } = await models.Category.create({ name });

  return { ...dataValues, id };
};

/**
 * @description Get all categories
 * @returns {Promise<object[]>}
 */
const getAll = async () => {
  const categories = await models.Category.findAll({ order: [['id', 'ASC']] });

  const result = categories.map((category) => category.dataValues);

  return result;
};

/**
 * @description Get a category by id
 * @param {string} id
 * @returns {Promise<object>}
 */
const getById = async (id) => {
  const category = await models.Category.findOne({ where: { id } });

  if (!category) throwNewError('categoryNotFound');

  return category.dataValues;
};

module.exports = {
  create,
  getAll,
  getById,
};
