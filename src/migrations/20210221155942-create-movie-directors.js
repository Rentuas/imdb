'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('movie_directors', {
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
    director_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'directors',
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

  down: (queryInterface) => queryInterface.dropTable('movie_directors'),
};
