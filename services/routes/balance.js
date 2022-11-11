const Controller = require("../controller/balance");
const Authentication = require("../middleware/authentication");
const balanceRouter = require("express").Router();

balanceRouter.post("/pay", Authentication, Controller.topUp);

module.exports = balanceRouter;
