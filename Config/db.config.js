const Sequelize = require('sequelize');
const sequelize = new Sequelize("appointments", "root", "derrick3", {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../Models/users')(sequelize, Sequelize);

module.exports = db;