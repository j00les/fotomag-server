const Controller = require("../controller/transaction");
const AuthenCourier = require("../middleware/authenCourier");
const Authentication = require("../middleware/authentication");

const transactionRouter = require("express").Router();

transactionRouter.post("/:idAtk", Authentication, Controller.createTransaction);
transactionRouter.patch("/:transactionId", Controller.changeStatus);
transactionRouter.get("/history", Authentication, Controller.history);
transactionRouter.get(
  "/listTransaction/",
  Authentication,
  Controller.listTransaction
);
transactionRouter.get("/courier/:id", AuthenCourier, Controller.listCourier);
transactionRouter.get("/customer/", Authentication, Controller.listCustomer);

module.exports = transactionRouter;
