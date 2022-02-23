const { Category } = require('../models');

const { throwNewError } = require('../helpers');

const create = async (name) => {
  let category = await Category.findOne({ where: { name } });

  if (category) throwNewError('categoryConflict');

  category = await Category.create({ name });

  return category;
};

const getAll = async () => {
  const categories = await Category.findAll({ order: [['id', 'ASC']] });

  return categories;
};

module.exports = {
  create,
  getAll,
};
