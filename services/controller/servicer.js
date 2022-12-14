let { User, ATK, sequelize, Courier, Sequelize } = require("../models/index");

class Controller {
  // register atk
  static async register(req, res, next) {
    const t = await sequelize.transaction();
    try {
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
      if (!email) {
        throw { name: "Email is required" };
      }
      const dataCourier = await Courier.findOne({
        where: {
          email,
        },
      });

      if (dataCourier) {
        throw { name: "Email must be Unique" };
      }

      const dataUser = await User.create({
        name,
        email,
        password,
        address,
        balance: 0,
        role: "Merchant",
      });

      const dataAtk = await ATK.create(
        {
          name: atkName,
          address: atkAddress,

          priceColor: +priceColor,
          priceBlack: +priceBlack,
          priceJilid: +priceJilid,
          location: sequelize.fn(
            "ST_GeomFromText",
            "POINT(37.4220936 -122.083922)"
          ),

          UserId: dataUser.id,
        },
        { transaction: t }
      );
      res.status(201).json({
        merchantName: dataUser.name,
        shopName: dataAtk.name,
      });
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  // get all atk
  static async getServicers(req, res, next) {
    try {
      const dataAtk = await ATK.findAll();
      res.status(200).json(dataAtk);
    } catch (error) {
      next(error);
    }
  }

  // get atk by id
  static async getServicer(req, res, next) {
    try {
      const { atkId } = req.params;
      const dataATK = await ATK.findOne({
        where: {
          id: atkId,
        },
      });

      if (!dataATK) {
        throw { name: "Toko not found" };
      }
      res.status(200).json(dataATK);
    } catch (error) {
      next(error);
    }
  }

  // edit harga perlembat (warna atau hitam putih) dan harga jilid
  static async editServicer(req, res, next) {
    try {
      const { id } = req.user;
      let { priceColor, priceBlack, priceJilid } = req.body;

      const dataAtk = await ATK.findOne({
        where: {
          UserId: id,
        },
      });

      console.log(id);
      console.log(dataAtk.id);

      await ATK.update(
        { priceColor, priceBlack, priceJilid },
        { where: { id: dataAtk.id } }
      );

      const dataATK = await ATK.findOne({
        where: {
          id: dataAtk.id,
        },
      });

      if (!dataATK) {
        throw { name: "Toko not found" };
      }
      res.status(200).json({
        message: "You're success update",
        priceColor: dataATK.priceColor,
        priceBlack: dataATK.priceBlack,
        priceJilid: dataATK.priceJilid,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
