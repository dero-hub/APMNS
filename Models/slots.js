module.exports = (sequelize, Sequelize) => {
  const Slot = sequelize.define("slots", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    start_time: {
      type: Sequelize.STRING,
    },
    end_time: {
      type: Sequelize.STRING,
    }
  });

  return Slot;
};
