const db = require("../Config/db.config.js");
const SlotsModel = db.Slots;
const UsersModel = db.User;
const dotenv = require("dotenv");

dotenv.config();

const exeption = (msg) => {
  let message = {
    message: msg,
  }
  return message;
}

  exports.create = async(id, req, res) => {
    try {
        let {name, description, start_time, end_time} = req;

        let slot = {
            name: name,
            description: description,
            start_time: start_time,
            end_time: end_time,
            userId: id
        }

        if(!(start_time && end_time)){
            msg = "slot must have start-time and end-time!"
          return  res.status(200).json(exeption(msg));
        }

        let existingSlot = await SlotsModel.findOne({where :{start_time: start_time}});
        if(existingSlot){
          msg = "Time already occupied";
          res.status(200).json(exeption(msg));
          return;
        }

        slot.status = "Active";
        slot.duration = "2hrs";
        let savedSlot = await SlotsModel.create(slot);
        const str = JSON.stringify(savedSlot);
        const prs = JSON.parse(str);

        return res.status(200).json(prs)

    } catch (err) {
        
    }
  }

   exports.findAll = async (req, res) => {
    try {
      let slots = await SlotsModel.findAll();
      let str = JSON.stringify(slots);
      let par = JSON.parse(str);

      return res.status(200).json(par);
    } catch (err) {
      return res.status(500).json(err.message);
    }
   }

   exports.update = async (id, req, res) => {
    try {
      let {name, description, start_time, end_time} = req;
      if(!(start_time || end_time)){
        msg ="Slot must have time!"
        return res.status(200).json(exeption(msg));
      }
      let existingSlot = await SlotsModel.findOne({where: {id: id}});
      let str = JSON.stringify(existingSlot);
      let par = JSON.parse(str);
      if(!par){
        msg = "Slot does not exist";
        return res.status(200).json(msg);
      }

      let Slot = {
        name: name,
        description: description,
        start_time: start_time,
        end_time: end_time
      }

      let updatedSlot = await SlotsModel.update(Slot, {where: {id: id}});
      let slot = await SlotsModel.findOne({where: {id: id}});
      res.status(200).json(slot);
      return;
    } catch (err) {
      return res.status(200).json(err.message);
    }
   }

   exports.deleteAll = async (req, res) => {
    try {
      let slots = await SlotsModel.findAll();
      let str = JSON.stringify(slots);
      let par = JSON.parse(str);
      if (!par[0]) {
        msg = "No records were found!;";
        res.status(200).json(exeption(msg));
        return;
      }
      await SlotsModel.destroy({where: {}});
      msg = `Records deleted successfully!`;
      return res.status(200).json(exeption(msg));
    } catch (err) {
      return res.status(500).json(err.message);
    }
   }


  