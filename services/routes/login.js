const Controller = require("../controller/login");

const loginRouter = require("express").Router();

loginRouter.post("/", Controller.isLogin);

module.exports = loginRouter;
