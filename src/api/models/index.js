const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const { CONNECTION_STRING, DB_OPTIONS } = require('../../config/database');

const sequelizeConnection = new Sequelize(CONNECTION_STRING, DB_OPTIONS);

const _account = require('./account');
const _actor = require('./actor');
const _director = require('./director');
const _movie = require('./movie');
const _user = require('./user');
const _user_movies = require('./user-movies');
const _movie_actors = require('./movie-actors');
const _movie_directors = require('./movie-directors');

function initModels(sequelize) {
  const account = _account(sequelize, DataTypes);
  const actor = _actor(sequelize, DataTypes);
  const director = _director(sequelize, DataTypes);
  const movie = _movie(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);
  const userMovies = _user_movies(sequelize, DataTypes);
  const movieActors = _movie_actors(sequelize, DataTypes);
  const movieDirectors = _movie_directors(sequelize, DataTypes);

  movie.belongsToMany(actor, {
    through: movieActors,
  });
  actor.belongsToMany(movie, {
    through: movieActors,
  });

  movie.belongsToMany(user, {
    through: userMovies,
  })
  user.belongsToMany(movie, {
    through: userMovies,
  })

  movie.belongsToMany(director, {
    through: movieDirectors,
  })

  director.belongsToMany(movie, {
    through: movieDirectors,
  })

  return {
    Account: account,
    Actor: actor,
    Movie: movie,
    User: user,
    Director: director,
    MovieDirector: movieDirectors,
    MovieActors: movieActors,
    UserMovies: userMovies,
  };
}
module.exports = initModels(sequelizeConnection);
module.exports.initModels = initModels(sequelizeConnection);
module.exports.default = initModels(sequelizeConnection);
