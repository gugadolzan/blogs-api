const { throwNewError } = require('../helpers');
const { Sequelize, ...models } = require('../models');

const create = async ({ title, content, categoryIds, email }) => {
  const { id: userId } = await models.User.findOne({ where: { email } });

  // Check existence of categories
  await Promise.all(
    categoryIds.map(async (id) => {
      const category = await models.Category.findOne({ where: { id } });
      if (!category) throwNewError('categoryNotFound');
    }),
  );

  const { null: id } = await models.BlogPost.create({ title, content, userId });

  // Create associations between post and categories (many-to-many)
  await models.PostsCategory.bulkCreate(
    categoryIds.map((categoryId) => ({ categoryId, postId: id })),
  );

  return { id, userId, title, content };
};

const getAll = async () => {
  const blogPosts = await models.BlogPost.findAll({
    include: [
      { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
      { model: models.Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return blogPosts;
};

const getById = async (id) => {
  const blogPost = await models.BlogPost.findOne({
    include: [
      { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
      { model: models.Category, as: 'categories', through: { attributes: [] } },
    ],
    where: { id },
  });

  if (!blogPost) throwNewError('postNotFound');

  return blogPost;
};

const remove = async (postId, email) => {
  const user = await getById(postId);

  const { id: userId } = await models.User.findOne({ where: { email } });

  if (user.userId !== userId) throwNewError('unauthorized');

  await models.BlogPost.destroy({ where: { id: postId } });
};

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

  return posts;
};

const update = async (email, id, { title, content }) => {
  const { userId } = await getById(id);

  const { id: editorId } = await models.User.findOne({ where: { email } });

  if (userId !== editorId) throwNewError('unauthorized');

  await models.BlogPost.update({ title, content }, { where: { id } });

  return models.BlogPost.findOne({
    attributes: ['title', 'content', 'userId'],
    include: [
      { model: models.Category, as: 'categories', through: { attributes: [] } },
    ],
    where: { id },
  });
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  search,
  update,
};
