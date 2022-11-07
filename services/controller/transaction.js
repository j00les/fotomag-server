const {
  Transaction,
  Sequelize,
  BalanceMutation,
  User,
  ATK,
  sequelize,
} = require("../models/index");

class Controller {
  static async createTransaction(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.user;
      let { atkId } = req.params;
      let { fileName, colorVariant, duplicate, isJilid, address } = req.body;

      let totalPages = 100; //masih hardcode

      const dataATK = await ATK.findByPk(atkId); // untuk mendapatkan harga dari ATK nya supaya dinamis

      let harga = 0;
      if (colorVariant === "Berwarna") {
        harga = harga + dataATK.priceColor;
      } else if (colorVariant === "Hitamputih") {
        // dinamis
        harga = harga + dataATK.priceBlack; // dinamis
      }

      let hargaJilid = 0;
      if (isJilid === true) {
        hargaJilid = hargaJilid + dataATK.priceJilid;
      } else {
        hargaJilid = hargaJilid + 0;
      }
      // mendapatkan total price
      let totalPrice = totalPages * harga + hargaJilid;

      // create transaction
      const dataTransaction = await Transaction.create(
        {
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
          UserId: id,
          totalPrice: totalPrice,
          AtkId: atkId,
        },
        { transaction: t }
      );

      // mengurangi balance dari user yg melakukan transaction
      const dataUser = await User.findByPk(id); //  ini dapat dari req.user.id dari authen

      // nge cek, apabila uang nya kurang dari total harga yg harus dibayar, maka akan error
      if (dataUser.balance < totalPrice) {
        throw { name: "Your balance is less" };
      }
      // proses pengurangan uang
      await dataUser.decrement("balance", { by: totalPrice });

      // menambahakand uang yg di kurangi ke mutasi dlu
      const dataMutasi = await BalanceMutation.create(
        {
          nominal: totalPrice,
          UserId: dataUser.id,
          TransactionId: dataTransaction.id,
        },
        { transaction: t }
      );

      await t.commit();
      res.status(201).json({
        trasactionId: dataTransaction.id,
      });
    } catch (error) {
      await t.rollback();
      console.log(error);
      next(error);
    }
  }

  static async changeStatus(req, res, next) {
    try {
      let id = req.params.transactionId;
      let { status } = req.query;

      // ubah status progress
      if (status === "Progress") {
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
      }
      // ubah status jadi reject
      else if (status === "Reject") {
        // cari mutasi => where transactionId dari req.params.id
        // kemudian ambil data nominal nya, dan kirim lagi ke user nya
        // untuk mendapatkan customer id nya => cari transaction nya, dari req.params.id
        /// kemudian ambil UserId nya, dan find mutasinya dengan UserId
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
        // untuk medapatkan nominal nya
        const dataMutasi = await BalanceMutation.findOne({
          where: {
            TransactionId: id,
          },
        });

        // ini untuk dapatin transaksi nya yg mana
        const dataCustomer = await Transaction.findOne({
          where: {
            id: dataMutasi.TransactionId,
          },
        });

        const dataReject = await User.findOne({
          where: {
            id: dataCustomer.UserId,
          },
        });
        await dataReject.increment("balance", { by: dataMutasi.nominal });
      }
      // ubah status jadi done
      else if (status === "Done") {
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
      }
      // ubah status jadi Dilevery
      else if (status === "Delivery") {
        // const {id} = req.user
        const dataTransaction = await Transaction.update(
          {
            status,
            CourierId: 1, // ini dapat dari authenl, dari req.user abang kurir
          },
          {
            where: {
              id,
            },
          }
        );
      }
      // ubah status jadi Delivered
      else if (status === "Delivered") {
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
      }
      // ubah status jadi Success
      else if (status === "Success") {
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
        // ini untuk mendapatkan nominal
        const dataMutasi = await BalanceMutation.findOne({
          where: {
            TransactionId: id,
          },
        });

        const dataCustomer = await Transaction.findOne({
          where: {
            id: dataMutasi.TransactionId,
          },
        });

        const dataAtk = await ATK.findOne({
          where: {
            id: dataCustomer.UserId,
          },
        });
        const dataUserAtk = await User.findByPk(dataAtk.UserId);
        await dataUserAtk.increment("balance", { by: dataMutasi.nominal });
      }
      res.status(200).json({
        message: `Transaction is ${status}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async history(req, res, next) {
    try {
      // const { id } = req.params;
      const { id } = req.user;
      console.log(id, ".. aidi yg toko yg login");

      const dataUser = await User.findOne({
        where: {
          id,
        },
        include: ATK,
      });
      // console.log(dataUser.ATK);
      const data = await Transaction.findAll({
        where: {
          status: ["Success", "Reject"],
          AtkId: dataUser.ATK.id,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async listTransaction(req, res, next) {
    try {
      // const { id } = req.params;
      const { id } = req.user;
      const dataUser = await User.findOne({
        where: {
          id,
        },
        include: ATK,
      });

      const data = await Transaction.findAll({
        where: {
          status: ["Pending", "Progress", "Done", "Delivery", "Delivered"],
          AtkId: dataUser.ATK.id,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async listCourier(req, res, next) {
    try {
      const { id } = req.user;
      const data = await Transaction.findAll({
        where: {
          status: ["Done", "Delivery", "Delivered"],
          CourierId: id,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async listCustomer(req, res, next) {
    try {
      const { id } = req.user;
      console.log(id);
      const data = await Transaction.findAll({
        where: {
          CourierId: id,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = Controller;
