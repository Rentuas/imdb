const Joi = require('joi');
const movieService = require('./../../services/movie');
const { getAllGenreTypes } = require('./../../../constants/genre-movies')

module.exports = {

  listMovies:  async (req, res) => {
    try {

      const schemaPagination = Joi.object().keys({
        page: Joi.number().integer().default(0),
        pageSize: Joi.number().integer().default(20)
      });

      const pagination = await schemaPagination.validateAsync(req.query);

      const result = await movieService.listMovies(pagination);

      return res.status(200).json(result);

    } catch (e) {
      return res.status(e.status || 500).send({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  createMovie:  async (req, res) => {
    try {

      const validGenres = getAllGenreTypes();

      const schema = Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        genres: Joi.array().items(Joi.valid(...validGenres)).allow(null).default([]),
        directors: Joi.array().items(Joi.string().guid()).required(),
        actors: Joi.array().items(Joi.string().guid()).allow(null).default([])
      });

      const detailsMovie = await schema.validateAsync(req.body);

      const result = await movieService.create(detailsMovie);

      return res.status(200).json(result);

    } catch (e) {
      return res.status(e.status || 500).send({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  updateMovie:  async (req, res) => {
    try {

      const { movieId } = req.params;

      const validGenres = getAllGenreTypes();

      const schema = Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        genres: Joi.array().items(Joi.valid(...validGenres)).allow(null).default([]),
        directors: Joi.array().items(Joi.string().guid()).required(),
        actors: Joi.array().items(Joi.string().guid()).allow(null).default([])
      });

      const detailsMovie = await schema.validateAsync(req.body);

      const result = await movieService.update(movieId, detailsMovie);

      return res.status(200).json(result);
    } catch (e) {
      return res.status(e.status || 500).send({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  deleteMovie:  async (req, res) => {
    try {

      const { movieId } = req.params;

      await movieService.delete(movieId);

      return res.status(200).json();
    } catch (e) {
      return res.status(e.status || 500).send({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

};