const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define(
  'movieActors',
  {
    actorId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'actor_id',
    },
    movieId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'movie_id',
    },
  },
  {
    sequelize,
    tableName: 'movie_actors'
  },
);
