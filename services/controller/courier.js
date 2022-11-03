const { Courier } = require("../models/index");

class Contoller {
  static async register(req, res, next) {
    try {
      const { name, phoneNumber } = req.body;
      const dataKurir = await Courier.create({
        name,
        phoneNumber,
        location: (23.4, -44.5),
        AtkId: 1,
      });
      res.status(201).json({
        id: dataKurir.id,
        name: dataKurir.name,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = Contoller;
