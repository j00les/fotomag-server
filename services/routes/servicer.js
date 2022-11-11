const Controller = require("../controller/servicer");
const Authentication = require("../middleware/authentication");
const servicesRouter = require("express").Router();

servicesRouter.post("/register", Controller.register);
servicesRouter.get("/", Controller.getServicers);
servicesRouter.get("/:atkId", Controller.getServicer);
servicesRouter.patch("/", Authentication, Controller.editServicer);

module.exports = servicesRouter;
