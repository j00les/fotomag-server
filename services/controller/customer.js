const { User } = require("../models/index");

class Controller {
  static async getCustomer(req, res, next) {
    try {
      const dataCustomer = await User.findAll({
        where: {
          role: "Customer",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      console.log("register");
      let { name, email, password, address } = req.body;
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
