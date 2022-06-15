const users_service = require("../Services/users_service")

exports.create = async (req) => {
    try {
        let data = {
            User: await users_service.create(req.body)
        };
        return data
    } catch (err) {  
        return err.message;
      }
}