const db = require("../Config/db.config.js");
const bcrypt = require("bcrypt");
const jwt = require("../Security/auth");
const UsersModel = db.User;
const dotenv = require("dotenv");

dotenv.config();

const exeption = (msg) => {
  let message = {
    message: msg,
  };
  return message;
};

let msg = "";

const hashed = async (pass) => {
  return await bcrypt.hash(pass, 10);
};

const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.create = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password } = req;

    if (!(firstname || lastname || email || phone || password)) {
      msg = "Please fill in all the details";
      res.status(400).json(exeption(msg));
      return;
    }

    if (!(email && phone)) {
      msg = "Please enter your email or phone to proceed!";
      res.status(400).json(exeption(msg));
      return;
    }

    if (!email.match(mailformat)) {
      msg = "Please input a valid email and try again";
      res.status(200).json(exeption(msg));
      return;
    }

    let oldUser = await UsersModel.findOne({ where: { email: email } });
    let oldUserByPhone = await UsersModel.findOne({ where: { phone: phone } });

    if (oldUser || oldUserByPhone) {
      msg = "User Already Exist. Please Login or Reset your password";
      res.status(200).json(exeption(msg));
      return;
    }

    let user = {
      first_name: firstname,
      last_name: lastname,
      email: email.toLowerCase(),
      phone: phone,
      password: (await hashed(password)).toString(),
    };

    const savedUser = await UsersModel.create(user);
    const str = JSON.stringify(savedUser);
    const prs = JSON.parse(str);

    const token = jwt.generateAccessToken(prs.id, prs.phone );
    prs.token = token;
    console.log(prs);

    return res.status(200).json(prs);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    let { email, phone, password } = req;

    if (!(email || phone)) {
      msg = "Please input your email or phone number to proceed!";
      res.status(400).json(exeption(msg));
      return;
    }

    if ((email && phone)) {
        msg = "Cannot have both email and phone number!";
      res.status(400).json(exeption(msg));
      return;
    }

    if (email && !email.match(mailformat)) {
      msg = "Please input a valid email and try again";
      res.status(400).json(exeption(msg));
      return;
    }

    if (!password) {
      msg = "Please input your password to login!";
      res.status(400).json(exeption(msg));
      return;
    }

    let user = null;

    if (email) {
        let oldUser = await UsersModel.findOne({ where: { email: email } });
       let str = JSON.stringify(oldUser)
       let par = JSON.parse(str);
         user = par;
      } else if(phone){
        let oldUser = await UsersModel.findOne({ where: { phone: phone } });
        let str = JSON.stringify(oldUser)
        let par = JSON.parse(str);
        user = par;
      }

    if (!user) {
      msg = "Account not Found!";
      res.status(500).json(exeption(msg));
      return;
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      // save user token
      user.token = jwt.generateAccessToken(user.id, user.phone);
      res.status(200).json(user.token);
    } else {
      msg = "Invalid credentials try again";
      res.status(400).json(exeption(msg));
      return;
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.getOne = async (id, res) => {
  try {
    let user = await UsersModel.findOne({ where: { id: id } });
    let userStr = JSON.stringify(user);
    let userPar = JSON.parse(userStr);

    if (!userPar) {
      msg = "User not found!";
      return res.status(500).json(exeption(msg));
    }

    console.log(userPar);

    return res.status(200).json(userPar);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    let users = await UsersModel.findAll();
    let str = JSON.stringify(users);
    let par = JSON.parse(str);

    console.log(par);

    return res.json(par);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.update = async (id, req, res) => {
  try {
    let { firstname, lastname, email, phone, password } = req;
    let existingUser = await UsersModel.findOne({ where: { id: id } });
    let str = JSON.stringify(existingUser);
    let par = JSON.parse(str);
    if (!par) {
      msg = "User not Found";
      res.status(500).json(exeption(msg));
      return;
    }
    let obj = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      phone: phone,
    };

    await UsersModel.update(obj, { where: { id: id } });
    existingUser = await UsersModel.findOne({ where: { id: id } });
    return res.json(existingUser);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.deleteOne = async (id, res) => {
  try {
    let user = await UsersModel.findOne({ where: { id: id } });
    let userStr = JSON.stringify(user);
    let userPar = JSON.parse(userStr);

    if (!userPar) {
      msg = `User not found!`;
      return res.status(500).json(exeption(msg));
    }

    await UsersModel.destroy({ where: { id: id } });
    msg = `User successfully deleted!`;
    let obj = {
      userPar,
      msg: exeption(msg),
    };
    return res.status(200).json(obj);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteAll = async (req, res) => {
  try {
    let users = await UsersModel.findAll();
    userStr = JSON.stringify(users);
    userPar = JSON.parse(userStr);

    if (!userPar[0]) {
      msg = "No records were found!;";
      res.status(200).json(exeption(msg));
      return;
    }

    await UsersModel.destroy({ where: {} });

    msg = `Records deleted successfully!`;
    return res.status(200).json(exeption(msg));
  } catch (err) {
    res.status(500).json(err.message);
  }
};
