const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.generateAccessToken = ({id, phone}) => {
    return jwt.sign({id, phone}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  } 

exports.authenticateToken = async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET,  (err, user) => {
      console.log(err)
  
      if (err) return res.status(403)
  
      req.user = user
  
      next()
    })
  }