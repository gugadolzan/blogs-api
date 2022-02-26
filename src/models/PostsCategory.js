const associate = (models) => {
  models.BlogPost.belongsToMany(models.Category, {
    as: 'categories',
    through: models.PostsCategory,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });
  models.Category.belongsToMany(models.BlogPost, {
    as: 'blogPosts',
    through: models.PostsCategory,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });
};

module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define(
    'PostsCategory',
    {},
    { timestamps: false, tableName: 'PostsCategories' },
  );

  PostsCategory.associate = associate;

  return PostsCategory;
};
