const Joi = require('joi');
const userService = require('./../services/user');

module.exports = {
  createUser:  async (req, res) => {
    try {

      const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/).required(),
      });

      const detailsUser = await schema.validateAsync(req.body);

      const result = await userService.create(detailsUser);

      return res.status(200).json(result);
    } catch (e) {
      return res.status(e.status || 500).json({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },
  
  updateUser: async (req, res) => {
    try {
      const { user } = req;

      const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
      });

      const detailsUser = await schema.validateAsync(req.body);

      const result = await userService.update(user, detailsUser);

      return res.status(200).json(result);
    } catch (e) {
      return res.status(e.status || 500).json({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;

      await userService.deleteUser(userId);

      return res.status(200).json();
    } catch (e) {
      return res.status(e.status || 500).json({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  login: async  (req, res) => {
    try {

      const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
      });

      const detailsLogin = await schema.validateAsync(req.body);

      const result = await userService.login({
        username: detailsLogin.username,
        password: detailsLogin.password
      });

      return res.status(200).json(result);

    } catch (e) {
      return res.status(e.status || 500).json({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  logout: async  (req, res) => {
    try {

      const { user } = req

      const result = await userService.logout(user.id);

      return res.status(200).json();

    } catch (e) {
      return res.status(e.status || 500).json({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  }

};