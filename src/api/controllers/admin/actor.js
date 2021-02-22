const Joi = require('joi');
const actorService = require('./../../services/actor.js');

module.exports = {
  listActors:  async (req, res) => {
    try {

      const schemaPagination = Joi.object().keys({
        page: Joi.number().integer().default(0),
        pageSize: Joi.number().integer().default(20)
      });

      const pagination = await schemaPagination.validateAsync(req.query);

      const result = await actorService.listActors(pagination);

      return res.status(200).json(result);

    } catch (e) {
      return res.status(e.status || 500).send({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  createActor:  async (req, res) => {
    try {

      const schema = Joi.object().keys({
        fullName: Joi.string().required(),
        character: Joi.string().required(),
      });

      const detailsActor = await schema.validateAsync(req.body);

      const result = await actorService.create(detailsActor);

      return res.status(200).json(result);

    } catch (e) {
      return res.status(e.status || 500).send({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  updateActor:  async (req, res) => {
    try {

      const { actorId } = req.params;

      const schema = Joi.object().keys({
        fullName: Joi.string().required(),
      });

      const detailsActor = await schema.validateAsync(req.body);

      await actorService.update(actorId, detailsActor);

      return res.status(200).json();
    } catch (e) {
      return res.status(e.status || 500).send({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  deleteActor:  async (req, res) => {
    try {

      const { actorId } = req.params;

      await actorService.delete(actorId);

      return res.status(200).json();
    } catch (e) {
      return res.status(e.status || 500).send({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

};