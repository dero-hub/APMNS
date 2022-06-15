module.exports = (sequelize, Sequelize) => {
	const Parent = sequelize.define('users', {
	  
	  first_name: {
		  type: Sequelize.STRING
	  },
      last_name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
	  
	  password: {
       type: Sequelize.STRING	  
	}
	});
	
	return Parent;
};