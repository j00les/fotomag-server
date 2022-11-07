const {
  Transaction,
  Sequelize,
  BalanceMutation,
  User,
  ATK,
  sequelize,
} = require("../models/index");
const pdf = require("pdf-page-counter");
const cloudinary = require("cloudinary").v2;
const UploadApiResponse = require("cloudinary").v2;
const fs = require("fs");

class Controller {
  // buat transaction atau order
  static async createTransaction(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.user;
      let { atkId } = req.params;

      let {colorVariant, duplicate, isJilid, address } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: "Uploaded PDF is required" });
      }

      const dataBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdf(dataBuffer);
      const pdfPages = pdfData.numpages;

      let uploadedFile = UploadApiResponse;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "fotomagPDF",
          resource_type: "auto",
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Cloudinary Server Error" });
      }

      const { secure_url } = uploadedFile;

      const dataATK = await ATK.findByPk(atkId); // untuk mendapatkan harga dari ATK nya supaya dinamis

      let harga = 0;
      if (colorVariant === "Berwarna") {
        harga = harga + dataATK.priceColor;
      } else if (colorVariant === "Hitamputih") {
        harga = harga + dataATK.priceBlack; // dinamis
      }

      let hargaJilid = 0;
      if (isJilid === "YES") {
        hargaJilid = hargaJilid + dataATK.priceJilid;
      } else if (isJilid === "NO") {
        hargaJilid = hargaJilid + 0;
      }

      // mendapatkan total price
      let totalPrice = pdfPages * harga + hargaJilid;
      // console.log(pdfPages);
      // console.log(harga);
      // console.log(hargaJilid);
      // console.log(totalPrice);

      // create transaction
      const dataTransaction = await Transaction.create(
        {
          fileURL: secure_url,
          totalPages: pdfPages,
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
      res.status(201).json(dataTransaction);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  // ubah status jadi Progress
  static async changeStatusProgress(req, res, next) {
    try {
      let id = req.params.transactionId;

      const dataTransaction = await Transaction.update(
        {
          status: "Progress",
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: `Transaction is Progress}`,
      });
    } catch (error) {
      next(error);
    }
  }

  // ubah status jadi reject
  static async changeStatusReject(req, res, next) {
    try {
      let id = req.params.transactionId;
      // cari mutasi => where transactionId dari req.params.id
      // kemudian ambil data nominal nya, dan kirim lagi ke user nya
      // untuk mendapatkan customer id nya => cari transaction nya, dari req.params.id
      /// kemudian ambil UserId nya, dan find mutasinya dengan UserId

      const dataTransaction = await Transaction.update(
        {
          status: "Reject",
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

      // find one dulu, untuk mencari customer mana yg akan dikembalikan uang nya
      const dataReject = await User.findOne({
        where: {
          id: dataCustomer.UserId,
        },
      });
      await dataReject.increment("balance", { by: dataMutasi.nominal });

      res.status(200).json({
        message: `Transaction is Reject`,
      });
    } catch (error) {
      next(error);
    }
  }

  // ubah status jadi done
  static async changeStatusDone(req, res, next) {
    try {
      let id = req.params.transactionId;

      const dataTransaction = await Transaction.update(
        {
          status: "Done",
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: `Transaction is Done`,
      });
    } catch (error) {
      next(error);
    }
  }

  // ubah status jadi delivery
  static async changeStatusDelivery(req, res, next) {
    try {
      let id = req.params.transactionId;
      const { CourierId } = req.user;

      const dataTransaction = await Transaction.update(
        {
          status: "Delivery",
          CourierId: CourierId,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: `Transaction is Delivery`,
      });
    } catch (error) {
      next(error);
    }
  }

  // ubah status jadi Delivered
  static async changeStatusDelivered(req, res, next) {
    try {
      let id = req.params.transactionId;

      const dataTransaction = await Transaction.update(
        {
          status: "Delivered",
        },
        {
          where: {
            id,
          },
        }
      );
      if(!dataTransaction) {
        return res.status(400).json({message: 'ERROR DI DATA TRANSACTION'})
      }

      res.status(200).json({
        message: `Transaction is Delivered`,
      });
    } catch (error) {
      next(error);
    }
  }

  // ubah status jadi Success
  static async changeStatusSuccess(req, res, next) {
    try {
      let id = req.params.transactionId;
      console.log(id, '//////////// INI ID')
      const dataTransaction = await Transaction.update(
        {
          status: "Success",
        },
        {
          where: {
            id,
          },
        }
      );
      console.log(dataTransaction, '>>>>>>>>> INI DATA TRANSACTION')
      const dataMutasi = await BalanceMutation.findOne({
        where: {
          TransactionId: id,
        },
      });
      if(!dataMutasi) {
        return res.status(400).json({message: 'ERROR DI DATA MUTASI'})
      }

      const dataCustomer = await Transaction.findOne({
        where: {
          id: dataMutasi.TransactionId,
        },
      });
      if (!dataCustomer) {
        return res.status(400).json({message: 'ERROR DI DATA CUSTOMER'})
      }

      const dataAtk = await ATK.findOne({
        where: {
          id: dataCustomer.UserId,
        },
      });
      if(!dataAtk) {
        return res.status(400).json({message: "ERROR DI DATA ATK"})
      }
      console.log(dataAtk, '<><><><><><> INI DATA ATK')
      console.log(dataAtk.UserId, '<><><><><>< INI DATA ATK USER ID')
      const dataUserAtk = await User.findByPk(dataAtk.UserId);
      if(!dataUserAtk) {
        return res.status(400).json({message: "ERROR DI DATA USER ATK"})
      }
      await dataUserAtk.increment("balance", { by: dataMutasi.nominal });

      res.status(200).json({
        message: `Transaction is Success`,
      });
    } catch (error) {
      next(error);
    }
  }


  static async historyTransactionMerchant(req, res, next) {
    try {
      const { id } = req.user;
      const dataUser = await User.findOne({
        where: {
          id,
        },
        include: ATK,
      });

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

  static async listTransactionMerchant(req, res, next) {
    try {
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

  static async listTransactionCourier(req, res, next) {
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

  static async listTransactionCustomer(req, res, next) {
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
