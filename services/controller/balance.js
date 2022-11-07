const { User } = require("../models/index");
const midtransClient = require("midtrans-client");
class Controller {
  static async topUp(req, res, next) {
    try {
      const idMitrants = Math.random();
      const { nominal } = req.body;
      const { id } = req.user;
      if (!nominal) {
        throw { name: "Nominal is required" };
      }
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-JbrhEhGAfzWMT_Gvh4f15Cti",
      });

      let parameter = {
        transaction_details: {
          order_id: idMitrants,
          gross_amount: nominal,
        },

        customer_details: {
          first_name: "alex",
          last_name: "chandra",
          email: "alex@example.com",
          phone: "08111222333",
        },
      };

      const transactionToken = await snap.createTransaction(parameter);
      const dataUser = await User.findOne({
        where: {
          id: id, // dapat dari req.user dari authentication
        },
      });
      await dataUser.increment("balance", { by: nominal });
      res.status(201).json(transactionToken);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
