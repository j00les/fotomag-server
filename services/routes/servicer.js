const Controller = require("../controller/servicer");
const servicesRouter = require("express").Router();

servicesRouter.post("/register", Controller.register);
servicesRouter.get("/", Controller.getServicers);
servicesRouter.get("/:atkId", Controller.getServicer);
servicesRouter.patch("/:atkId", Controller.editServicer);

module.exports = servicesRouter;
