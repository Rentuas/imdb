const {
  Account
} = require('../models');

const bcrypt = require('bcryptjs')
const { generateJWTToken } = require('./../services/authorize')

module.exports = {

  findOneAccount:  async (accountId) => {
    try {

      const account = await Account.findOne({
        attributes: ['guid','fullName','username'],
        where: {
          id: accountId
        }
      });

      const response = {
        guid: account.guid,
        fullName: account.fullName,
        username: account.username
      }

      return response

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  create:  async (data) => {
    try {

      const account = await Account.create({
        fullName: data.fullName,
        username: data.username,
        password: await bcrypt.hash('bem vindo', 10),
      });

      const response = {
        guid: account.guid,
        fullName: account.fullName,
        username: account.username
      }

      return response

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  update:  async (accountId, data) => {
    try {

      const account = await Account.findOne({
        where: {
          id: accountId
        }
      });

      await account.update({
        fullName: data.fullName,
        username: data.username
      });

      const response = {
        guid: account.guid,
        fullName: account.fullName,
        username: account.username
      }

      return response

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  delete:  async (accountId) => {
    try {

      const account = await Account.findOne({
        where: {
          guid: accountId
        }
      });

      await account.destroy();

      return

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },


  login: async (data) => {
    try {
      const { username, password } = data;
      const account = await Account.findOne({
        where: {
          username: username,
        }
      });

      if (!account) {
        return {
          status: 401,
          result: 'Dados incorretos',
        };
      }

      const isValidPassword = await bcrypt.compare(password, account.password);
      if (!isValidPassword) {
       return {
          status: 401,
          result: 'Dados incorretos',
        };
      }

      const token = generateJWTToken({
        id: account.id,
        guid: account.guid,
        admin: true,
        loginAt: new Date()
      });

      const response = {
        guid: account.guid,
        token,
      };

      return response;

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }
  },
};
