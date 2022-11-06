const { User } = require("../models/index");
const midtransClient = require("midtrans-client");
class Controller {
  static async changeBalance(req, res, next) {
    try {
      let { id } = req.params;
      let { topUp } = req.body;
      //   let { id } = req.user;
      const dataUser = await User.findOne({
        where: {
          id,
        },
      });
      await dataUser.increment("balance", { by: topUp });
      res.status(200).json({
        message: `Berhasil top up user id ${id} sebanyak Rp.${topUp}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async topUp(req, res, next) {
    try {
      const idMitrants = Math.random();
      const { nominal } = req.body;
      const { id } = req.user;
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
          first_name: "budiw",
          last_name: "pratama",
          email: "budi.pra@example.com",
          phone: "08111222333",
        },
      };

      const transactionToken = await snap.createTransaction(parameter);
      const dataUser = await User.findOne({
        where: {
          id: id, // dari authen
        },
      });
      await dataUser.increment("balance", { by: nominal });
      res.status(201).json(transactionToken);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}
module.exports = Controller;
