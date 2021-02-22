const Joi = require('joi');
const movieService = require('./../services/movie');

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

  voteAMovie:  async (req, res) => {
    try {

      const { user, body } = req;
      const { movieId } = req.params;

      const schema = Joi.object().keys({
        rating: Joi.number().integer().min(0).max(4).required(),
      });

      const detailsVote = await schema.validateAsync(body);

      await movieService.addMovieVote(user, movieId, detailsVote.rating);

      return res.status(200).json();

    } catch (e) {
      return res.status(e.status || 500).send({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

};