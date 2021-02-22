'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('movie_actors', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
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
    actor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'actors',
        key: 'id',
      },
      onDelete: 'cascade'
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

  down: (queryInterface) => queryInterface.dropTable('movie_actors'),
  
};
