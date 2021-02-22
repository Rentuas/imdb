'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_movies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    guid: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    movie_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'movies',
        key: 'id',
      },
      onDelete: 'cascade'
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'cascade'
    },
    vote: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('user_movies'),
  
};
