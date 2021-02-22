const Joi = require('joi');
const accountService = require('./../../services/account');

module.exports = {
  getOwnerAccount: async (req, res) => {
    try {
      const { user } = req;

      const result = await accountService.findOneAccount(user.id);

      return res.status(200).json(result);
    } catch (e) {
      return res.status(e.status || 500).json({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  createAccount:  async (req, res) => {
    try {
      const schema = Joi.object().keys({
        fullName: Joi.string().required(),
        username: Joi.string().required(),
      });

      const detailsAccount = await schema.validateAsync(req.body);

      const result = await accountService.create(detailsAccount);

      return res.status(200).json(result);
    } catch (e) {
      return res.status(e.status || 500).json({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },
  
  updateAccount: async (req, res) => {
    try {
      const { user } = req;

      const schema = Joi.object().keys({
        fullName: Joi.string().required(),
        username: Joi.string().required(),
      });

      const detailsAccount = await schema.validateAsync(req.body);

      const result = await accountService.update(user.id, detailsAccount);

      return res.status(200).json(result);
    } catch (e) {
      return res.status(e.status || 500).json({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  deleteAccount: async (req, res) => {
    try {
      const { accountId } = req.params;

      await accountService.delete(accountId);

      return res.status(200).json();
    } catch (e) {
      return res.status(e.status || 500).json({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  },

  deleteOwnerAccount: async (req, res) => {
    try {
      const { user } = req;

      await accountService.delete(user.guid);

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

      const result = await accountService.login({
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

      const detailsLogin = await schema.validateAsync(req.body);

      const result = await accountService.adminLogout(user.id);

      return res.status(200).json(result);

    } catch (e) {
      return res.status(e.status || 500).json({
        result: e.result || e.message || 'Falha ao processar sua requisição',
      });
    }
  }

};