const Controller = require("../controller/transaction");
const Authentication = require("../middleware/authentication");

const transactionRouter = require("express").Router();

transactionRouter.post("/:idAtk", Authentication, Controller.createTransaction);
transactionRouter.patch("/:id", Controller.changeStatus);
transactionRouter.get("/history", Authentication, Controller.history);
transactionRouter.get(
  "/listTransaction/",
  Authentication,
  Controller.listTransaction
);
transactionRouter.get("/courier/:id", Controller.listCourier);
transactionRouter.get("/customer/:id", Controller.listCustomer);

module.exports = transactionRouter;
