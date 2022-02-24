const rescue = require('express-rescue');

const { CODES, throwNewError } = require('../helpers');
const schemas = require('../schemas');
const services = require('../services');

const create = rescue(async (req, res) => {
  const { email } = req;
  const { title, content, categoryIds } = req.body;

  const { error } = schemas.BlogPost.validate({ title, content, categoryIds });

  if (error) throwNewError('joi', error);

  const blogPost = await services.BlogPost.create({
    title,
    content,
    categoryIds,
    email,
  });

  res.status(CODES.CREATED).json(blogPost);
});

const getAll = rescue(async (_req, res) => {
  const blogPosts = await services.BlogPost.getAll();

  res.status(CODES.OK).json(blogPosts);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const blogPost = await services.BlogPost.getById(id);

  res.status(CODES.OK).json(blogPost);
});

const update = rescue(async (req, res) => {
  const {
    body,
    email,
    params: { id },
    method,
  } = req;

  const { error } = schemas.BlogPost.validate(body, { context: { method } });

  if (error) throwNewError('joi', error);

  const { content, title } = body;

  const blogPost = await services.BlogPost.update(email, id, {
    title,
    content,
  });

  res.status(CODES.OK).json(blogPost);
});

const remove = rescue(async (req, res) => {
  const {
    email,
    params: { id },
  } = req;

  await services.BlogPost.remove(id, email);

  res.status(CODES.NO_CONTENT).end();
});

const search = rescue(async (req, res) => {
  const { q } = req.query;

  const blogPosts = await services.BlogPost.search(q);

  res.status(CODES.OK).json(blogPosts);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  search,
};
