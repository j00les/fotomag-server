const Controller = require("../controller/balance");
const balanceRouter = require("express").Router();

balanceRouter.patch("/topUp", Controller.topUp);

module.exports = balanceRouter;
