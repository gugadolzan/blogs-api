const associate = (models) => {
  models.User.hasMany(models.BlogPost, {
    foreignKey: 'userId',
    as: 'blogPosts',
  });
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    { timestamps: false, tableName: 'Users' },
  );

  User.associate = associate;

  return User;
};
