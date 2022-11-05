const Controller = require("../controller/transaction");

const transactionRouter = require("express").Router();

transactionRouter.post("/:idAtk", Controller.createTransaction);
transactionRouter.patch("/:id", Controller.changeStatus);
transactionRouter.get("/history/:id", Controller.history);
transactionRouter.get("/listTransaction/:id", Controller.listTransaction);
transactionRouter.get("/courier/:id", Controller.listCourier);
transactionRouter.get("/customer/:id", Controller.listCustomer);

module.exports = transactionRouter;
