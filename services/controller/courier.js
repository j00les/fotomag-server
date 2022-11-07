const { Courier, Sequelize } = require("../models/index");

class Controller {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const { id } = req.params
      const dataKurir = await Courier.create({
        name,
        email,
        password,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(107.59422277037818 -6.937911900280693)"
        ),
        AtkId: id,
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
module.exports = Controller;
