const Controller = require("../controller/balance");
const balanceRouter = require("express").Router();

balanceRouter.patch("/topUp/:id", Controller.topUp);

module.exports = balanceRouter;
