const db = require('../Config/db.config.js');
const UsersModel = db.User;

exports.create = async (req) => {
    try{
    const {user} = req;
    if(!user){
        return "Please fill in some data!"
    }
    const savedUser = await UsersModel.create(user);
    console.log(savedUser);
    return savedUser;
    } catch(err){
        return err.message;
    };
}
