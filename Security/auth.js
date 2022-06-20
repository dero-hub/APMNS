const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.generateAccessToken = (user_id, phone) => {
    return jwt.sign({user_id: user_id, phone: phone}, process.env.TOKEN_SECRET, { expiresIn: '2h' });
  } 

   exports.verifyToken = (req, res) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).json({message: "A token is required for authentication"});
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      console.log(decoded);
      return decoded;
    } catch (err) {
      return res.status(401).json({message: "Invalid Token"});
    }
  };
  