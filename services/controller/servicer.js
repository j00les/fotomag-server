const { comparePassword, createAccessToken } = require("../helper/helper");
let { User, ATK, sequelize } = require("../models/index");
class Controller {
  static async register(req, res, next) {
    const t = await sequelize.transaction();
    try {
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

      const datAtk = await ATK.create(
        {
          name: atkName,
          address: atkAddress,
          priceColor,
          priceBlack,
          priceJilid,
          location: sequelize.fn(
            "ST_GeomFromText",
            "POINT(37.4220936 -122.083922)"
          ),
          UserId: dataUser.id,
        },
        { transaction: t }
      );
      res.status(201).json({
        id: dataUser.id,
        email: dataUser.email,
      });
      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
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
        role: dataUser.role,
      };
      const access_token = createAccessToken(payload);
      res.status(200).json({
        access_token: access_token,
        role: dataUser.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getServicers(req, res, next) {
    try {
      const dataAtk = await ATK.findAll();
      res.status(200).json(dataAtk);
    } catch (error) {
      next(error);
    }
  }

  static async getServicer(req, res, next) {
    try {
      const { id } = req.params;
      // console.log(id);
      // console.log("masuk sini");
      const dataATK = await ATK.findByPk(id);
      res.status(200).json(dataATK);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async editServicer(req, res, next) {
    try {
      const { id } = req.params;
      console.log("masuk edit");
      let { priceColor, priceBlack, priceJilid } = req.body;
      await ATK.update(
        { priceColor, priceBlack, priceJilid },
        { where: { id: id } }
      );
      res.status(200).json({message: "You're success update"})
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
