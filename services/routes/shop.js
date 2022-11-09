const shopRouter = require("express").Router();
const Controller = require("../controller/shop");

shopRouter.get("/nearestShop", Controller.getNearestShop);

module.exports = shopRouter;
