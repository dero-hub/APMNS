const Sequelize = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();
const sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
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
db.Slots = require('../Models/slots')(sequelize, Sequelize);

db.User.hasMany(db.Slots, {as: "slots"});
db.Slots.belongsTo(db.User, {foreignKey: 'userId', as: 'user'});

module.exports = db;