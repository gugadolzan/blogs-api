const associate = (models) => {
  models.BlogPost.belongsToMany(models.Category, {
    as: 'categories',
    through: models.BlogPost,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });
  models.Category.belongsToMany(models.BlogPost, {
    as: 'blogPosts',
    through: models.Category,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });
};

module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define(
    'PostsCategory',
    {
      // postId: { type: DataTypes.INTEGER, primaryKey: true },
      // categoryId: { type: DataTypes.INTEGER, primaryKey: true },
    },
    { timestamps: false, tableName: 'PostsCategories' },
  );

  PostsCategory.associate = associate;

  return PostsCategory;
};
