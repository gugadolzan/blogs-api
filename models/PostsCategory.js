module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define(
    'PostsCategory',
    {
      // postId: { type: DataTypes.INTEGER, primaryKey: true },
      // categoryId: { type: DataTypes.INTEGER, primaryKey: true },
    },
    {
      timestamps: false,
      tableName: 'PostsCategories',
    },
  );

  return PostsCategory;
};
