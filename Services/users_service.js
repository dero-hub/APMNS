const db = require('../Config/db.config.js');
const UsersModel = db.User;

const exeption = (msg) => {
    let message = {
        message: msg
    }
    return message;
}

let msg = '';

exports.create = async (req, res) => {
    try{
    const {firstname, lastname, email, phone, password} = req;

    if(!(firstname || lastname || email || phone || password)){
         msg = "Please fill in all the details"
        res.status(400).json(exeption(msg));
        return;
    }

    if(!(email && phone)){
        msg = "Please enter your email or phone to proceed!"
        res.status(400).json(exeption(msg));
        return;
    }

    let user = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        phone: phone,
        password: password
    }

    const savedUser = await UsersModel.create(user);
    const str = JSON.stringify(savedUser);
    const prs = JSON.parse(str)
    console.log(prs);

   return res.status(200).json(prs);

} catch(err){
    res.status(500).send(err.message);
};
}

exports.getOne = async(id, res) => {

    try{
    let user = await UsersModel.findOne({where: {id: id}});
    let userStr = JSON.stringify(user);
    let userPar = JSON.parse(userStr);

    if(!userPar){
        msg = "User not found!"
        return res.status(500).json(exeption(msg));
    }

    console.log(userPar);

   return res.status(200).json(userPar);
}catch(err){
    res.status(500).json(err.message)
}
}

exports.getAll = async(req, res) => {
    try {
        let users = await UsersModel.findAll();
        let str = JSON.stringify(users);
        let par = JSON.parse(str)
        
        console.log(par);

      return res.json(par);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

exports.update = async(id, req, res) => {
    try {
        let {firstname, lastname, email, phone, password} = req;
        let existingUser = await UsersModel.findOne({where: {id: id}});
        let str = JSON.stringify(existingUser);
        let par = JSON.parse(str);
        if(!par){
            msg = "User not Found";
            res.status(500).json(exeption(msg));
            return;
        }
        let obj = {
        first_name: firstname,
        last_name : lastname,
        email : email,
        phone : phone,
        }

        await UsersModel.update(obj,{where: {id: id}});
         existingUser = await UsersModel.findOne({where: {id: id}});
        return res.json(existingUser);
    } catch (err) {
        return res.status(500).json(err.message);
    }
}


exports.deleteOne = async(id, res) => {

    try{
    let user = await UsersModel.findOne({where: {id: id}});
    let userStr = JSON.stringify(user);
    let userPar = JSON.parse(userStr);

    if(!userPar){
        msg = "User not found!"
        return res.status(500).json(exeption(msg));
    }

    let deleted = await UsersModel.destroy({where: {id: id}});
     return res.status(200).json(deleted);
}catch(err){
    res.status(500).json(err.message)
}
}

exports.deleteAll = async(req, res) => {
    try {
        await UsersModel.findAll();
      let deleted = await UsersModel.destroy({where:{}});
      return res.status(200).json(deleted);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

