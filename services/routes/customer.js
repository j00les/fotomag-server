const Controller = require("../controller/customer");

const customerRouter = require("express").Router();

customerRouter.post("/register", Controller.register);

module.exports = customerRouter;
