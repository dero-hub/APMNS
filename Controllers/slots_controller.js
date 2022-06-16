const slots_service = require("../Services/slots_service")

exports.create = async (req, res) => {
    try {
        let data = {
            Slot: await slots_service.create(req.body, res)
        };
        return data;
    } catch (err) {  
        return err.message;
      }
}