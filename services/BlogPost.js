const { throwNewError } = require('../helpers');
const {
  BlogPost,
  Category,
  User,
  PostsCategory,
  Sequelize: { Op },
} = require('../models');

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
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    where: { id },
  });

  if (!blogPost) throwNewError('postNotFound');

  return blogPost;
};

const update = async (email, id, { title, content }) => {
  const { userId } = await getById(id);

  const { id: editorId } = await User.findOne({ where: { email } });

  if (userId !== editorId) throwNewError('unauthorized');

  await BlogPost.update({ title, content }, { where: { id } });

  return BlogPost.findOne({
    attributes: ['title', 'content', 'userId'],
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    where: { id },
  });
};

const remove = async (postId, email) => {
  const user = await getById(postId);

  const { id: userId } = await User.findOne({ where: { email } });

  if (user.userId !== userId) throwNewError('unauthorized');

  await BlogPost.destroy({ where: { id: postId } });
};

const search = async (searchTerm) => {
  const posts = await BlogPost.findAll({
    where: {
      // Filtering queries using sequelize Operators
      // Refer to https://sequelize.org/v5/manual/models-usage.html#complex-filtering---or---not-queries
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { content: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  search,
};
