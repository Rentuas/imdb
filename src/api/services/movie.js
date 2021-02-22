const {
  Movie,
  Director,
  Actor
} = require('../models');

const { buildPaginatedQuery } = require('../../helpers/sequelize-helpers');
const { listDirectorsByIds } = require('./director')
const { listActorsByIds } = require('./actor')

const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const { CONNECTION_STRING, DB_OPTIONS } = require('../../config/database.js');

const sequelize = new Sequelize(CONNECTION_STRING, DB_OPTIONS);

module.exports = {

  listMovies:  async (paginationData) => {
    try {

      const pagination = buildPaginatedQuery(paginationData);

      const movies = await Movie.findAll({
        attributes: ['guid','title', 'description'],
        include: [
          {
            model: Director,
            attributes: ['guid', 'fullName'],
            through: { attributes: [] },
          },
          {
            model: Actor,
            attributes: ['guid', 'fullName'],
            through: { attributes: [] },
          }
        ],
        ...pagination
      });

      return movies

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  create:  async (data) => {
    try {

      const directors = await Director.findAll({
        where: {
          guid: {
            [Op.in]: data.directors
          }
        }
      })

      const actors = await Actor.findAll({
        where: {
          guid: {
            [Op.in]: data.actors
          }
        }
      })

      const result = await sequelize.transaction(async (t) => {
        const movie = await Movie.create({
          title: data.title,
          description: data.description
        }, {transaction: t});
  
        const movieDirectors = await movie.addDirectors(directors, {transaction: t});

        const movieCast = await movie.addActors(actors, {transaction: t})

        return {
          guid: movie.guid,
          title: movie.title,
          description: movie.description,
          directors: await listDirectorsByIds(movieDirectors.map(director => director.directorId)),
          actors: await listActorsByIds(movieCast.map(actor => actor.actorId))
        }
      });

      return result

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  update:  async (movieId, data) => {
    try {

      const movie = await Movie.findOne({
        where: {
          guid: movieId
        },
        include: [Actor, Director]
      })

      if(!movie) {
        return { 
          status: 422,
          result: 'Filme não encontrado'
        }
      }

      const directors = await Director.findAll({
        where: {
          guid: {
            [Op.in]: data.directors
          }
        }
      })

      const actors = await Actor.findAll({
        where: {
          guid: {
            [Op.in]: data.actors
          }
        }
      })

      const result = await sequelize.transaction(async (t) => {
        await movie.update({
          title: data.title,
          description: data.description
        }, {transaction: t});


        await movie.setDirectors(directors, {transaction: t});

        await movie.setActors(actors, {transaction: t})

        return {
          guid: movie.guid,
          title: movie.title,
          description: movie.description,
          directors: await listDirectorsByIds(directors.map(director => director.id)),
          actors: await listActorsByIds(actors.map(actor => actor.id))
        }
      });

      return result

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  delete:  async (movieId) => {
    try {

      const movie = await Movie.findOne({
        where: {
          guid: movieId
        }
      });

      await movie.destroy();

      return

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  addMovieVote:  async (user, movieId, rating) => {
    try {

      const movie = await Movie.findOne({
        where: {
          guid: movieId
        }
      });

      if(!movie) {
        throw {
          status: 422,
          result: 'Filme não existe'
        }
      }

      await user.setMovies([movie.id], { through: { vote: rating }})

      return

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },
  
};
