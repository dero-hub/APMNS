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

exports.login = async (req, res) => {
    try {
        let data = {
            User: await users_service.login(req.body, res)
        };
        return data;
    } catch (err) {  
        return err.message;
      }
}

exports.getOne = async (req, res) => {
    try {
        let id = req.params.id;
        let data = {
            User: await users_service.getOne(id, res)
        }
        return data
    } catch (err) {
        return err.message;
    }
}

exports.getAll = async (req, res) => {
    try {
        let data = {
            Users: await users_service.getAll(req, res)
        }
        return data
    } catch (err) {
        return err.message;
    }
}

exports.update = async (req, res) => {
    try {
        let id = req.params.id;
        let body = req.body;
        let data = {
            User: await users_service.update(id, body, res)
        }
        return data
    } catch (err) {
        return err.message;
    }
}

exports.deleteOne = async (req, res) => {
    try {
        let id = req.params.id;
        let data = {
            User: await users_service.deleteOne(id, res)
        }
        return data
    } catch (err) {
        return err.message;
    }
}

exports.deleteAll = async (req, res) => {
    try {
        let data = {
            User: await users_service.deleteAll(req, res)
        }
        return data
    } catch (err) {
        return err.message;
    }
}
