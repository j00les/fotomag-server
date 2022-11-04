const { comparePassword, createAccessToken } = require("../helper/helper");
const { Courier, Sequelize } = require("../models/index");

class Controller {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const dataKurir = await Courier.create({
        name,
        email,
        password,
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
      const { email, password } = req.body;
      const dataCourier = await Courier.findOne({
        where: {
          email,
        },
      });

      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      if (!dataCourier) {
        throw { name: "Invalid email/password" };
      }

      if (!comparePassword(password, dataCourier.password)) {
        throw { name: "Invalid email/password" };
      }

      const payload = {
        id: dataCourier.id,
      };

      const access_token = createAccessToken(payload);

      res.status(200).json({
        access_token,
      });
    } catch (error) {
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
