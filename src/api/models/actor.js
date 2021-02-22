const { DataTypes } = require('sequelize');


module.exports = (sequelize) => sequelize.define(
  'actor',
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
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    character: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'actors',
  },
);
