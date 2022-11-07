const Controller = require("../controller/balance");
const Authentication = require("../middleware/authentication");
const balanceRouter = require("express").Router();

balanceRouter.patch("/topUp/:id", Authentication, Controller.changeBalance);
balanceRouter.post("/pay", Authentication, Controller.topUp);

module.exports = balanceRouter;
