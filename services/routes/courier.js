const Controller = require("../controller/courier");

const courierRouter = require("express").Router();

courierRouter.post("/register", Controller.register);

module.exports = courierRouter;
