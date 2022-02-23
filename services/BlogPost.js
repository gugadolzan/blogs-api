const { throwNewError } = require('../helpers');
const { BlogPost, Category, User, PostsCategory } = require('../models');

const create = async ({ title, content, categoryIds, email }) => {
  const { id: userId } = await User.findOne({ where: { email } });

  // Check existence of categories
  await Promise.all(
    categoryIds.map(async (id) => {
      const category = await Category.findOne({ where: { id } });
      if (!category) throwNewError('categoryNotFound');
    }),
  );

  const { null: id } = await BlogPost.create({ title, content, userId });

  // Create associations between post and categories (many-to-many)
  await PostsCategory.bulkCreate(
    categoryIds.map((categoryId) => ({ categoryId, postId: id })),
  );

  return { id, userId, title, content };
};

const getAll = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return blogPosts;
};

const getById = async (id) => {
  const blogPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!blogPost) throwNewError('postNotFound');

  return blogPost;
};

module.exports = {
  create,
  getAll,
  getById,
};
