const users_service = require("../Services/users_service")

exports.create = async (req, res) => {
    try {
        let data = {
            User: await users_service.create(req.body, res)
        };
        return data;
    } catch (err) {  
        return err.message;
      }
}