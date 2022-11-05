const Controller = require("../controller/courier");

const courierRouter = require("express").Router();

courierRouter.post("/register/:id", Controller.register);
// courierRouter.post("/login", Controller.login);
courierRouter.get("/", Controller.getCourier);

module.exports = courierRouter;
