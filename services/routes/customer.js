const Controller = require("../controller/customer");
const Authentication = require("../middleware/authentication");

const customerRouter = require("express").Router();

customerRouter.get("/", Controller.getCustomer);
customerRouter.post("/register", Controller.register);
customerRouter.patch("/", Authentication, Controller.updatedLocation);

module.exports = customerRouter;
