const { comparePassword, createAccessToken } = require("../helper/helper");
let { User, Courier } = require("../models/index");


class Controller {
  static async isLogin(req, res, next) {
    try {
        console.log("masuk sini");
      const { email, password } = req.body;
      console.log(email, password);
      let dataPayload = {};
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
        };
        dataPayload = payload;
      } else {
        const dataCourier = await Courier.findOne({
          where: { email },
        });
        if (!comparePassword(password, dataCourier.password)) {
          throw { name: "Invalid email/password" };
        }
        const payload = {
          id: dataCourier.id,
        };
        dataPayload = payload;
      }
      console.log(dataPayload);
      const access_token = createAccessToken(dataPayload);
      res.status(200).json({
        access_token: access_token,
      });
    } catch (error) {
        console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;