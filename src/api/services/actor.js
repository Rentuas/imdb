const {
  Actor
} = require('../models');

const { buildPaginatedQuery } = require('../../helpers/sequelize-helpers');

const { Op } = require('sequelize');

module.exports = {

  listActors:  async (paginationData) => {
    try {

      const pagination = buildPaginatedQuery(paginationData);

      const actors = await Actor.findAll({
        attributes: ['guid','fullName','character'],
        ...pagination
      });
      
      return actors

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  listActorsByIds:  async (actorIds) => {
    try {

      const actors = await Actor.findAll({
        attributes: ['guid','fullName'],
        where: {
          id: {
            [Op.in]: actorIds
          }
        }
      });

      return actors

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  create:  async (data) => {
    try {

      const actor = await Actor.create({
        fullName: data.fullName,
        character: data.character
      });

      const response = {
        guid: actor.guid,
        fullName: actor.fullName,
        character: actor.character
      }

      return response

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  update:  async (actorId, data) => {
    try {

      const actor = await Actor.findOne({
        where: {
          id: actorId
        }
      });

      await actor.update({
        fullName: data.fullName
      });

      const response = {
        guid: actor.guid,
        fullName: actor.fullName
      }

      return response

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

  delete:  async (actorId) => {
    try {

      const actor = await Actor.findOne({
        where: {
          guid: actorId
        }
      });

      await actor.destroy();

      return

    } catch (error) {
      throw {
        status: 500,
        result: error,
      };
    }

  },

};
