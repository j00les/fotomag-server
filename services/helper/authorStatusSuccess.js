const { User, Transaction, Courier } = require("../models/index");

const authorStatusSuccess = async (req, res, next) => {
  try {
    const { id } = req.user;
    const idT = req.params.transactionId;

    const dataUser = await User.findByPk(id);
    const dataCourier = await Courier.findByPk(id);
    const dataTransaction = await Transaction.findByPk(idT);

    if (!dataTransaction || !dataCourier || !dataUser) {
      throw { name: "Transaction not found" };
    }

    console.log(dataTransaction, "INI YAAA");
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
