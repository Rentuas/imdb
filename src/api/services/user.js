const {
  User
} = require('../models');

const bcrypt = require('bcryptjs')
const { generateJWTToken } = require('./../services/authorize')
const { Op } = require('sequelize');

module.exports = {

  create:  async (data) => {
    try {

      const userWithSameUsername = await User.findOne({
        where: {
          username: data.username
        }
      })

      if(userWithSameUsername) {
        return {
          status: 422,
          result: 'Este nome de usuário já se encontra em uso'
        }
      }

      const user = await User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: await bcrypt.hash(data.password, 10),
      });

      return  {
        guid: user.guid,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username
      }

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  update:  async (user, data) => {
    try {

      const userWithSameUsername = await User.findOne({
        where: {
          [Op.and]: [
            {
              username: data.username
            },
            {
              id: {
                [Op.not]: user.id
              }
            }
          ]
        }
      })

      if(userWithSameUsername) {
        return {
          status: 422,
          result: 'Este nome de usuário já se encontra em uso'
        }
      }

      await user.update({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
      });

      return {
        guid: user.guid,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username
      }

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  delete:  async (user) => {
    try {

      await user.destroy();

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
      const user = await User.findOne({
        where: {
          username: username,
        }
      });

      if (!user) {
        return {
          status: 401,
          result: 'Dados incorretos',
        };
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
       return {
          status: 401,
          result: 'Dados incorretos',
        };
      }

      const token = generateJWTToken({
        id: user.id,
        guid: user.guid,
        admin: false,
        loginAt: new Date()
      });

      return {
        guid: user.guid,
        token
      };

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }
  },
};
