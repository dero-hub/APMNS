const db = require('../Config/db.config.js');
const UsersModel = db.User;

const exeption = (msg) => {
    let message = {
        message: msg
    }
    return message;
}

exports.create = async (req, res) => {
    try{
    const {firstname, lastname, email, phone, password} = req;
    let msg = '';

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
