const { Sequelize } = require('sequelize');

module.exports = new Sequelize('wins', 'root', 'galichka11.07', {
  dialect: 'mysql',
  host: process.env.HOST,
});
