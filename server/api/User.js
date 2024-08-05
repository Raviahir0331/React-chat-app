const { DataTypes } = require('sequelize');
const sequelize = require('./config/database'); // Adjust path accordingly

const User = sequelize.define('User', {
  facebookId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
