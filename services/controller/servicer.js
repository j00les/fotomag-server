const { comparePassword, createAccessToken } = require("../helper/helper");
let { User, ATK, Sequelize } = require("../models/index");
class Controller {
  static async register(req, res, next) {
    const t = await Sequelize.transaction();
    try {
      console.log("register");
      // client bakal milih map, dapet long latnya
      // req.body
      let {
        name,
        email,
        password,
        address,
        atkName,
        atkAddress,
        priceColor,
        priceBlack,
        priceJilid,
      } = req.body;
      const dataUser = await User.create(
        {
          name,
          email,
          password,
          address,
          balance: 0,
          role: "Servicer",
        },
        { transaction: t }
      );

      const datAtk = await ATK.create({
        name: atkName,
        address: atkAddress,
        priceColor,
        priceBlack,
        priceJilid,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(107.59422277037818 -6.937911900280693)"
        ),
        UserId: dataUser.id,
      });
      res.status(201).json({
        id: dataUser.id,
        email: dataUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const dataUser = await User.findOne({
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
      if (!dataUser) {
        throw { name: "Invalid email/password" };
      }
      if (!comparePassword(password, dataUser.password)) {
        throw { name: "Invalid email/password" };
      }
      const payload = {
        id: dataUser.id,
      };
      const access_token = createAccessToken(payload);
      res.status(200).json({
        access_token: access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getServicers(req, res, next) {
    // try {
    //   const dataCustomer = await Customer.findAll();
    //   res.status(200).json(dataCustomer);
    // } catch (error) {
    //   next(error);
    // }
  }
  static async getServicer(req, res, next) {
    // try {
    //   const { id } = req.params;
    //   const dataCustomer = await Customer.findOne({
    //     where: {
    //       id,
    //     },
    //   });
    //   res.status(200).json(dataCustomer);
    // } catch (error) {
    //   next(error);
    // }
  }
}

module.exports = Controller;
