const Controller = require("../controller/transaction");

const transactionRouter = require("express").Router();

transactionRouter.post("/:idAtk", Controller.createTransaction);
transactionRouter.patch("/:id", Controller.changeStatus);

module.exports = transactionRouter;
