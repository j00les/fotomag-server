const { comparePassword, createAccessToken } = require("../helper/helper");
const { User } = require("../models/index");

class Controller {
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

  static async getCustomers(req, res, next) {
    try {
      const dataCustomer = await User.findAll();
      res.status(200).json(dataCustomer);
    } catch (error) {
      next(error);
    }
  }

  static async getCostumer(req, res, next) {
    try {
      const { id } = req.params;
      const dataCustomer = await User.findOne({
        where: {
          id,
        },
      });
      res.status(200).json(dataCustomer);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCustomer(req, res, next) {
    try {
      const { id } = req.params;
      const data = await User.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: `user with id ${id}, deleted Succcessfully`,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
