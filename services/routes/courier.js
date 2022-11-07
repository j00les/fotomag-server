const Controller = require("../controller/courier");

const courierRouter = require("express").Router();

courierRouter.post("/register/:atkId", Controller.register);

module.exports = courierRouter;
