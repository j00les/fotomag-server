const Controller = require("../controller/customer");

const customerRouter = require("express").Router();

customerRouter.post("/", Controller.register);
customerRouter.post("/", Controller.login);
customerRouter.get("/", Controller.getCustomers);
customerRouter.get("/:id", Controller.getCostumer);

module.exports = customerRouter;
