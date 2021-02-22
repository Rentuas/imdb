const { DataTypes } = require('sequelize');


module.exports = (sequelize) => sequelize.define(
  'movie',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    guid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    genre: {
      type: DataTypes.ENUM('terror', 'romance', 'comédia', 'ação'),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'movies',
  },
);
