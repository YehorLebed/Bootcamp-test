const Sequelize = require('sequelize');
const { DB_NAME, USER, PASSWORD } = require('../db-settings');

const sequelize = new Sequelize(DB_NAME, USER, PASSWORD, {
  dialect: 'mysql'
});

sequelize.sync()
  .then(res => console.log(res))
  .catch(err => console.log(err));

module.exports = sequelize;

