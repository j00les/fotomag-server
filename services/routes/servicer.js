const Controller = require("../controller/servicer");
const servicesRouter = require("express").Router();

servicesRouter.post("/register", Controller.register);
// servicesRouter.post("/login", Controller.login);
servicesRouter.get("/", Controller.getServicers);
servicesRouter.get("/:id", Controller.getServicer);
servicesRouter.patch("/:id", Controller.editServicer);

module.exports = servicesRouter;
