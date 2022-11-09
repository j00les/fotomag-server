const { comparePassword, createAccessToken } = require("../helper/helper");
let { User, Courier } = require("../models/index");

class Controller {
  static async isLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      let dataPayload = {};
      let data = {};
      let dataC = {};
      if (!email) {
        throw { name: "Email is required" };
      }
      if (!password) {
        throw { name: "Password is required" };
      }
      const dataUser = await User.findOne({
        where: {
          email,
        },
      });
      if (dataUser) {
        if (!comparePassword(password, dataUser.password)) {
          throw { name: "Invalid email/password" };
        }
        const payload = {
          id: dataUser.id,
          email: dataUser.email,
        };
        dataPayload = payload;
        data = dataUser;
      } else {
        const dataCourier = await Courier.findOne({
          where: { email },
        });
        if (!dataCourier) {
          throw { name: "Invalid email/password" };
        }
        if (!comparePassword(password, dataCourier.password)) {
          throw { name: "Invalid email/password" };
        }
        const payload = {
          id: dataCourier.id,
          email: dataCourier.email,
        };
        dataPayload = payload;
        data = { role: "Courier" };
        dataC = dataCourier;
      }
      const access_token = createAccessToken(dataPayload);

      res.status(200).json({
        access_token: access_token,
        role: data.role,
        balance: data.balance,
        name: data.name,
        name: dataC.name,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
