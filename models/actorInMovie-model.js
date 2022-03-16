const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

const ActorInMovie = sequelize.define("actorInMovie", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  actorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  moviesId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { ActorInMovie };
