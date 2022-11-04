const { Courier, Sequelize } = require("../models/index");

class Controller {
  static async register(req, res, next) {
    try {
      const { name, phoneNumber } = req.body;
      const dataKurir = await Courier.create({
        name,
        phoneNumber,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(107.59422277037818 -6.937911900280693)"
        ),
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

  static async login(req, res, next) {
    try {
      const { phoneNumber } = req.body;
      const dataCourier = await Courier.findOne({
        where: {
          phoneNumber,
        },
      });

      const data = await Courier.findOne({
        where: {
          phoneNumber,
        },
      });

      if (!phoneNumber) {
        throw { name: "Phone Number is required" };
      }

      if (!dataCourier) {
        throw { name: "Invalid phoneNumber" };
      }

      res.status(200).json({
        message: `Welcome mr.${data.name}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getCourier(req, res, next) {
    try {
      const dataCourier = await Courier.findAll();
      res.status(200).json(dataCourier);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
