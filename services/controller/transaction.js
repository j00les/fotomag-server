const {
  Transaction,
  Sequelize,
  BalanceMutation,
  User,
} = require("../models/index");

class Controller {
  // create transaction
  static async createTransaction(req, res, next) {
    try {
      let {
        fileName,
        colorVariant,
        duplicate,
        isJilid,
        address,
        UserId, //customer ID
        CourierId,
      } = req.body;

      let totalPages = 100;

      let harga = 0;
      if (colorVariant === "Berwarna") {
        harga = harga + 500;
      } else if (colorVariant === "hitamputih") {
        // dinamis
        harga = harga + 300; // dinamis
      }

      let hargaJilid = 0;
      if (isJilid === true) {
        hargaJilid = hargaJilid + 3000;
      } else {
        hargaJilid = hargaJilid + 0;
      }
      // mendapatkan total price
      let totalPrice = totalPages * harga + hargaJilid;

      // create transaction
      const dataTransaction = await Transaction.create({
        fileName,
        totalPages,
        colorVariant,
        duplicate,
        isJilid,
        address,
        status: "Pending",
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(107.59422277037818 -6.937911900280693)"
        ),
        UserId, // ini id dari ATK nya
        CourierId, // ini nanti pakai select option
        totalPrice: totalPrice,
      });

      // mengurangi balance dari user yg melakukan transaction
      const dataUser = await User.findByPk(1); // 1 ini dapat dari req.user.id dari authen
      await dataUser.decrement("balance", { by: totalPrice });

      // menambahakand uang yg di kurangi ke mutasi dlu
      const dataMutasi = await BalanceMutation.create({
        nominal: totalPrice,
        UserId: dataUser.id,
        TransactionId: dataTransaction.id,
      });

      res.status(201).json({
        trasactionId: dataTransaction.id,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async changeStatusByATK(req, res, next) {
    try {
      let { id } = req.params;
      let { status } = req.body; // string (Reject atau Progres)
      const dataTransaction = await Transaction.update(
        {
          status,
        },
        {
          where: {
            id,
          },
        }
      );
      if (status === "Reject") {
        // cari mutasi => where transactionId dari req.params.id
        // kemudian ambil data nominal nya, dan kirim lagi ke user nya
        // untuk mendapatkan customer id nya => cari transaction nya, dari req.params.id
        /// kemudian ambil UserId nya, dan find mutasinya dengan UserId
        const dataMutasi = await BalanceMutation.findOne({
          where: {
            TransactionId: id,
          },
        });
        console.log(dataMutasi.nominal);
        const dataCustomer = await Transaction.findOne({
          where: {
            id: dataMutasi.TransactionId,
          },
        });
        console.log(dataCustomer.UserId);
        const dataReject = await User.findOne({
          where: {
            id: dataCustomer.UserId,
          },
        });
        console.log(dataReject, ">>>>>>>>>>");
        await dataReject.increment("balance", { by: dataMutasi.nominal });

        // console.log(dataMutasi.nominal, ">>>>>>>>>>>>>>>>>>>");
        // console.log(dataCustomer.id, "<<<<<<<<<<<<<<<<<<<<<<<<");
      }
      res.status(200).json({
        message: `Transaction is ${status}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async changeStatusByCustomer(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const dataTransaction = await Transaction.update(
        {
          status,
        },
        {
          where: {
            id,
          },
        }
      );
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
