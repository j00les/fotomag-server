const { Courier, Sequelize, ATK, User } = require("../models/index");

class Controller {
  // get courier
  static async getCourier(req, res, next) {
    try {
      const dataCourier = await Courier.findAll();
      res.status(200).json(dataCourier);
    } catch (error) {
      next(error);
    }
  }

  // register courier must login with user merchant
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      if (!email) {
        throw { name: "Email is required" };
      }
      const { id } = req.user;

      const dataATK = await ATK.findOne({
        where: {
          UserId: id,
        },
      });

      const dataUser = await User.findOne({
        where: {
          email: email,
        },
      });

      if (dataUser) {
        throw { name: "Email must be Unique" };
      }

      const dataKurir = await Courier.create({
        name,
        email,
        password,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(107.59422277037818 -6.937911900280693)"
        ),
        AtkId: dataATK.id,
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

  // updated location
  static async updatedLocation(req, res, next) {
    try {
      let { longitude, latitude } = req.body;
      const { CourierId } = req.user;
      const dataC = await Courier.findByPk(CourierId);
      if (!dataC) {
        throw { name: "Courier not found" };
      }
      const dataCourier = await Courier.update(
        {
          location: Sequelize.fn(
            "ST_GeomFromText",
            `POINT(${longitude} ${latitude})`
          ),
        },
        {
          where: {
            id: CourierId,
          },
        }
      );

      res.status(200).json({
        message: `Success Updated location Courier`,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
