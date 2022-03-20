const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

const Movie = sequelize.define('movie', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'active',
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  // img: {
  //   type: DataTypes.STRING(100),
  //   allowNull: false
  // },
  genre: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
});

module.exports = { Movie };
