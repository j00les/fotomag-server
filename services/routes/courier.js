const Controller = require("../controller/courier");
const Authentication = require("../middleware/authentication");

const courierRouter = require("express").Router();

courierRouter.post("/register", Authentication, Controller.register);

module.exports = courierRouter;
