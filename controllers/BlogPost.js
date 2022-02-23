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

const getAll = rescue(async (req, res) => {
  const blogPosts = await services.BlogPost.getAll();

  res.status(codes.OK).json(blogPosts);
});

module.exports = {
  create,
  getAll,
};
