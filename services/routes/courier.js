const Controller = require("../controller/courier");
const AuthenCourier = require("../middleware/authenCourier");
const Authentication = require("../middleware/authentication");

const courierRouter = require("express").Router();

courierRouter.post("/register", Authentication, Controller.register);
courierRouter.get("/", Controller.getCourier);
courierRouter.patch("/", AuthenCourier, Controller.updatedLocation);

module.exports = courierRouter;
