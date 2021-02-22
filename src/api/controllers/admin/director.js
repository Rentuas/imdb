const Joi = require('joi');
const directorService = require('./../../services/director.js');

module.exports = {
  listDirectors:  async (req, res) => {
    try {

      const schemaPagination = Joi.object().keys({
        page: Joi.number().integer().default(0),
        pageSize: Joi.number().integer().default(20)
      });

      const pagination = await schemaPagination.validateAsync(req.query);

      const result = await directorService.listDirectors(pagination);

      return res.status(200).json(result);

    } catch (e) {
      return res.status(e.status || 500).send({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  createDirector:  async (req, res) => {
    try {

      const schema = Joi.object().keys({
        fullName: Joi.string().required(),
      });

      const detailsDirector = await schema.validateAsync(req.body);

      const result = await directorService.create(detailsDirector);

      return res.status(200).json(result);

    } catch (e) {
      return res.status(e.status || 500).send({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  updateDirector:  async (req, res) => {
    try {

      const { directorId } = req.params;

      const schema = Joi.object().keys({
        fullName: Joi.string().required(),
      });

      const detailsDirector = await schema.validateAsync(req.body);

      const result = await directorService.update(directorId, detailsDirector);

      return res.status(200).json();
    } catch (e) {
      return res.status(e.status || 500).send({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  deleteDirector:  async (req, res) => {
    try {

      const { directorId } = req.params;

      const result = await directorService.delete(directorId);

      return res.status(200).json();
    } catch (e) {
      return res.status(e.status || 500).send({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

};