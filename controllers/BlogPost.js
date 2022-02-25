const rescue = require('express-rescue');

const { CODES, payloadValidator } = require('../helpers');
const schemas = require('../schemas');
const services = require('../services');

/**
 * @description Create a new blog post
 * @method POST
 * @path /post
 */
const create = rescue(async (req, res) => {
  const { email } = req;
  const { categoryIds, content, title } = req.body;

  payloadValidator(schemas.BlogPost, { categoryIds, content, title });

  const blogPost = await services.BlogPost.create({
    categoryIds,
    content,
    email,
    title,
  });

  res.status(CODES.CREATED).json(blogPost);
});

/**
 * @description Get all blog posts
 * @method GET
 * @path /post
 */
const getAll = rescue(async (_req, res) => {
  const blogPosts = await services.BlogPost.getAll();

  res.status(CODES.OK).json(blogPosts);
});

/**
 * @description Get a blog post by id
 * @method GET
 * @path /post/:id
 */
const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const blogPost = await services.BlogPost.getById(id);

  res.status(CODES.OK).json(blogPost);
});

/**
 * @description Delete a blog post by id
 * @method DELETE
 * @path /post/:id
 */
const remove = rescue(async (req, res) => {
  const { email } = req;
  const { id } = req.params;

  await services.BlogPost.remove(email, id);

  res.status(CODES.NO_CONTENT).end();
});

/**
 * @description Search for blog posts by title or content
 * @method GET
 * @path /post/search/:query
 */
const search = rescue(async (req, res) => {
  const { q } = req.query;

  const blogPosts = await services.BlogPost.search(q);

  res.status(CODES.OK).json(blogPosts);
});

/**
 * @description Update a blog post by id
 * @method PUT
 * @path /post/:id
 */
const update = rescue(async (req, res) => {
  const { email, method } = req;
  const { categoryIds, content, title } = req.body;
  const { id } = req.params;

  payloadValidator(
    schemas.BlogPost,
    { categoryIds, content, title },
    { context: { method } },
  );

  const blogPost = await services.BlogPost.update(email, id, {
    content,
    title,
  });

  res.status(CODES.OK).json(blogPost);
});

module.exports = {
  create,
  getAll,
  getById,
  remove,
  search,
  update,
};
