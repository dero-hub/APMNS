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
db.Slots = require('../Models/slots')(sequelize, Sequelize);

db.User.hasMany(db.Slots, {foreignKey: 'userId', sourceKey: 'id'});
db.Slots.belongsTo(db.Student, {foreignKey: 'slotId', targetKey: 'id'});

module.exports = db;