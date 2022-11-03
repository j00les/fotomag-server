const Contoller = require("../controller/courier");

const courierRouter = require("express").Router();

courierRouter.post("/register", Contoller.register);

module.exports = courierRouter;
