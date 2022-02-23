const rescue = require('express-rescue');

const { codes } = require('../helpers');
const schemas = require('../schemas');
const services = require('../services');

const create = rescue(async (req, res) => {
  const { title, content, categoryIds, email } = req.body;

  const { error } = schemas.BlogPost.validate({ title, content, categoryIds });

  if (error) throw error;

  const blogPost = await services.BlogPost.create({
    title,
    content,
    categoryIds,
    email,
  });

  res.status(codes.CREATED).json(blogPost);
});

const getAll = rescue(async (_req, res) => {
  const blogPosts = await services.BlogPost.getAll();

  res.status(codes.OK).json(blogPosts);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const blogPost = await services.BlogPost.getById(id);

  res.status(codes.OK).json(blogPost);
});

module.exports = {
  create,
  getAll,
  getById,
};
