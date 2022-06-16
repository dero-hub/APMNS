module.exports = (sequelize, Sequelize) => {
  const Slot = sequelize.define("users", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    start_time: {
      type: Sequelize.DATE,
    },
    end_time: {
      type: Sequelize.DATE,
    }
  });

  return Slot;
};
