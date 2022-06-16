const db = require("../Config/db.config.js");
const jwt = require("../Security/auth");
const SlotsModel = db.Slots;
const dotenv = require("dotenv");

dotenv.config();

const exeption = (msg) => {
  let message = {
    message: msg,
  }
  return message;
}

  exports.create = async(req, res) => {
    try {
        let {name, description, start_time, end_time} = req;

        let slot = {
            name: name,
            description: description,
            start_time: start_time,
            end_time: end_time
        }

        if(!(start_time && end_time)){
            msg = "slot must have start-time and end-time!"
          return  res.status(200).json(exeption(msg));
        }

        let savedSlot = await SlotsModel.create(slot);
        const str = JSON.stringify(savedSlot);
        const prs = JSON.parse(str);
         console.log(prs);
        return res.status(200).json(prs)

    } catch (err) {
        
    }
  }