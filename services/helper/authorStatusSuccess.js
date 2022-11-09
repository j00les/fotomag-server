const { User, Transaction, Courier } = require("../models/index");

const authorStatusSuccess = async (req, res, next) => {
  try {
    const { id } = req.user;
    const idT = req.params.transactionId;

    const dataUser = await User.findByPk(id);
    const dataCourier = await Courier.findByPk(id);
    const dataTransaction = await Transaction.findByPk(idT);
    console.log(dataTransaction, '<><><><><><><><><><>')
    console.log(id);
    console.log(idT);
    console.log(dataUser.role);
    console.log(dataUser.id);
    console.log(dataTransaction.UserId);
    console.log(dataTransaction.CourierId);
    console.log(dataCourier.id);

    if (dataUser.id != dataTransaction.UserId) {
      throw { name: "This is not your transaction" };
    } else if (
      dataUser.role === "Merchant" ||
      dataCourier.id !== dataTransaction.CourierId
    ) {
      throw { name: "This is not your jurisdiction" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorStatusSuccess;
