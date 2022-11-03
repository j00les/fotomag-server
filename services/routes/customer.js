const Controller = require("../controller/customer");

const customerRouter = require("express").Router();

customerRouter.post("/register", Controller.register);
customerRouter.post("/login", Controller.login);
customerRouter.get("/", Controller.getCustomers);
customerRouter.get("/:id", Controller.getCostumer);
customerRouter.delete("/:id", Controller.deleteCustomer);

module.exports = customerRouter;
