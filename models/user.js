const Sequelize = require('sequelize')
const sequelize = require('../utils/connection');

class User extends Sequelize.Model { }
User.init({
  email: Sequelize.STRING,
  realName: Sequelize.STRING,
  password: Sequelize.STRING,
  birthDate: Sequelize.DATE,
  registeration_date_time: {
    type: Sequelize.INTEGER,
    defaultValue: Math.floor(Date.now() / 1000)
  }
}, { sequelize, modelName: 'user' });

module.exports = User;