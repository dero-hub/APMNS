const slots_service = require("../Services/slots_service")

exports.create = async (req, res) => {
    try {
        let data = {
            Slot: await slots_service.create(req.body, res)
        };
        return data;
    } catch (err) {  
        return res.status(500).json(err.message);
      }
}

exports.findAll = async (req, res) => {
    try {
        let data = {
            slots: await slots_service.findAll(req, res)
        };
        return data;
    } catch (err) {  
        return res.status(500).json(err.message);
      }
}

exports.update = async (req, res) => {
    try {
        let id = req.params.id;
        let data = {
            Slot: await slots_service.update(id, req.body, res)
        };
        return data;
    } catch (err) {  
        return res.status(500).json(err.message);
      }
}

exports.deleteAll = async (req, res) => {
    try {
        let data = {
            slots: await slots_service.deleteAll(req, res)
        };
        return data;
    } catch (err) {  
        return res.status(500).json(err.message);
      }
}