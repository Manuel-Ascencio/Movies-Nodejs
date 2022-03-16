const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

const Review = sequelize.define("review", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  raiting: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(100),
    defaultValue: "active",
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Review };
