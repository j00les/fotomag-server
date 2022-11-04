const Controller = require("../controller/servicer");
const servicesRouter = require("express").Router();

servicesRouter.post("/register", Controller.register);
servicesRouter.post("/login", Controller.login);
servicesRouter.get("/", Controller.getServicers);
servicesRouter.get("/", Controller.getServicer);

module.exports = servicesRouter;
