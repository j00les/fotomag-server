const Controller = require("../controller/servicer");
const servicesRouter = require("express").Router();

servicesRouter.post("/register", Controller.register);
servicesRouter.get("/", Controller.getServicers);
servicesRouter.get("/:id", Controller.getServicer);
servicesRouter.patch("/:id", Controller.editServicer);

module.exports = servicesRouter;
