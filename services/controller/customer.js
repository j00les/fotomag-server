const { User, Courier } = require("../models/index");

class Controller {
  static async getCustomer(req, res, next) {
    try {
      const dataCustomer = await User.findAll();
      res.status(200).json(dataCustomer);
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      let { name, email, password, address } = req.body;
      const dataCourier = await Courier.findOne({
        where: {
          email: email,
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
        role: "Customer",
      });

      res.status(201).json({
        id: dataUser.id,
        email: dataUser.email,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
