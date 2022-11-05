const Controller = require("../controller/transaction");

const transactionRouter = require("express").Router();

transactionRouter.post("/:idAtk", Controller.createTransaction);
transactionRouter.patch("/:id", Controller.changeStatus);
// transactionRouter.patch("/:id", Controller.changeStatusByCustomer);

module.exports = transactionRouter;
