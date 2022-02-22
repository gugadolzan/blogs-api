module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: { defaultValue: DataTypes.NOW, type: DataTypes.DATE },
      updated: { defaultValue: DataTypes.NOW, type: DataTypes.DATE },
    },
    {
      timestamps: false,
      tableName: 'BlogPosts',
    },
  );

  return BlogPost;
};
