'use strict';
const { uuid } = require('uuidv4');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accounts', [{
      guid: uuid(),
      full_name: 'Usuário Master',
      username: 'master',
      password: await bcrypt.hash('master', 10),
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts', null, {});
  }
};
