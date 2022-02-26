const models = require('../models');

/**
 * @description Create associations between post and categories (many-to-many)
 * @param {string[]} categoryIds
 * @param {string} postId
 */
const bulkCreate = async (categoryIds, postId) =>
  models.PostsCategory.bulkCreate(
    categoryIds.map((categoryId) => ({ categoryId, postId })),
  );

module.exports = {
  bulkCreate,
};
