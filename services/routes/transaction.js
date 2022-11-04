const Controller = require("../controller/transaction");

const transactionRouter = require("express").Router();

transactionRouter.post("/", Controller.createTransaction);
transactionRouter.patch("/:id", Controller.changeStatusByATK);
module.exports = transactionRouter;
