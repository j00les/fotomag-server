const Controller = require("../controller/servicer");
const servicesRouter = require("express").Router();

servicesRouter.post("/", Controller.register);
servicesRouter.post("/", Controller.login);
servicesRouter.get("/", Controller.getServicers);
servicesRouter.get("/", Controller.getServicer);

module.exports = servicesRouter;
