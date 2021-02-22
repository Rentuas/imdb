const {
  Director
} = require('../models');

const { buildPaginatedQuery } = require('../../helpers/sequelize-helpers');

const Sequelize = require('sequelize');
const { Op } = require('sequelize');

module.exports = {

  listDirectors:  async (paginationData) => {
    try {

      const pagination = buildPaginatedQuery(paginationData);

      const directors = await Director.findAll({
        attributes: ['guid','fullName'],
        ...pagination
      });

      return directors

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  listDirectorsByIds:  async (directorsIds) => {
    try {

      const directors = await Director.findAll({
        attributes: ['guid','fullName'],
        where: {
          id: {
            [Op.in]: directorsIds
          }
        }
      });

      return directors

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  create:  async (data) => {
    try {

      const director = await Director.create({
        fullName: data.fullName
      });

      const response = {
        guid: director.guid,
        fullName: director.fullName
      }

      return response

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  update:  async (directorId, data) => {
    try {

      const director = await Director.findOne({
        where: {
          id: directorId
        }
      });

      await director.update({
        fullName: data.fullName
      });

      const response = {
        guid: director.guid,
        fullName: director.fullName
      }

      return response

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  delete:  async (directorId) => {
    try {

      const director = await Director.findOne({
        where: {
          guid: directorId
        }
      });

      await director.destroy();

      return

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },
  
};
