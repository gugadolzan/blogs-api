const { throwNewError } = require('../helpers');
const { Sequelize, ...models } = require('../models');

const CategoryService = require('./Category');
const PostsCategoryService = require('./PostsCategory');

/**
 * @description Create a new blog post
 * @param {{ categoryIds: number[], content: string, title: string, userId: string }} payload
 * @returns {Promise<object>}
 */
const create = async ({ categoryIds, content, title, userId }) => {
  // Check existence of categories
  await Promise.all(categoryIds.map(async (id) => CategoryService.getById(id)));

  const { null: postId, dataValues } = await models.BlogPost.create({
    title,
    content,
    userId,
  });

  await PostsCategoryService.bulkCreate(categoryIds, postId);

  const { published, updated, ...result } = dataValues;

  return { ...result, id: postId };
};

/**
 * @description Get all blog posts
 * @returns {Promise<object[]>}
 */
const getAll = async () => {
  const blogPosts = await models.BlogPost.findAll({
    include: [
      { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
      { model: models.Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  // Tip from Pablo Assunção
  // Refer to https://stackoverflow.com/a/55440445
  const result = blogPosts.map((blogPost) => blogPost.get({ plain: true }));

  return result;
};

/**
 * @description Get a blog post by id
 * @param {string} id
 * @returns {Promise<object>}
 */
const getById = async (id) => {
  const blogPost = await models.BlogPost.findOne({
    include: [
      { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
      { model: models.Category, as: 'categories', through: { attributes: [] } },
    ],
    where: { id },
  });

  if (!blogPost) throwNewError('postNotFound');

  const result = blogPost.get({ plain: true });

  return result;
};

/**
 * @description Delete a blog post by id
 * @param {string} postId
 * @param {string} userId
 */
const remove = async (postId, userId) => {
  const blogPost = await models.BlogPost.findOne({ where: { id: postId } });

  if (!blogPost) throwNewError('postNotFound');

  if (blogPost.userId !== userId) throwNewError('unauthorized');

  await models.BlogPost.destroy({ where: { id: postId } });
};

/**
 * @description Get a blog post by query
 * @param {string} searchTerm
 * @returns {Promise<object[]>}
 */
const search = async (searchTerm) => {
  const posts = await models.BlogPost.findAll({
    where: {
      // Filtering queries using sequelize Operators
      // Refer to https://sequelize.org/v5/manual/models-usage.html#complex-filtering---or---not-queries
      [Sequelize.Op.or]: [
        { title: { [Sequelize.Op.like]: `%${searchTerm}%` } },
        { content: { [Sequelize.Op.like]: `%${searchTerm}%` } },
      ],
    },
    include: [
      { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
      { model: models.Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  const result = posts.map((post) => post.get({ plain: true }));

  return result;
};

/**
 * @description Update a blog post by id
 * @param {string} postId
 * @param {string} userId
 * @param {{ content: string, title: string }} payload
 */
const update = async (postId, userId, { content, title }) => {
  const blogPost = await models.BlogPost.findOne({ where: { id: postId } });

  if (!blogPost) throwNewError('postNotFound');

  if (blogPost.userId !== userId) throwNewError('unauthorized');

  await models.BlogPost.update(
    { title, content, updated: new Date() },
    { where: { id: postId } },
  );

  const blogPostUpdated = await models.BlogPost.findOne({
    attributes: ['title', 'content', 'userId'],
    include: [
      { model: models.Category, as: 'categories', through: { attributes: [] } },
    ],
    where: { id: postId },
  });

  const result = blogPostUpdated.get({ plain: true });

  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  search,
  update,
};
