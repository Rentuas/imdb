const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define(
  'movieDirectors',
  {
    directorId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'director_id',
    },
    movieId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'movie_id',
    },
  },
  {
    sequelize,
    tableName: 'movie_directors'
  },
);
