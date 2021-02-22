const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define(
  'userMovies',
  {
    guid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    vote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'user_id',
    },
    movieId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'movie_id',
    },
  },
  {
    sequelize,
    tableName: 'user_movies'
  },
);
