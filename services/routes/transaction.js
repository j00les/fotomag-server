const Controller = require("../controller/transaction");
const AuthenCourier = require("../middleware/authenCourier");
const Authentication = require("../middleware/authentication");
const upload = require("../middleware/multer");
const transactionRouter = require("express").Router();

transactionRouter.patch("/progress/:transactionId", Controller.changeStatus);
transactionRouter.patch("/reject/:transactionId", Controller.changeStatus);
transactionRouter.patch("/done/:transactionId", Controller.changeStatus);
transactionRouter.patch("/delivery/:transactionId", Controller.changeStatus);
transactionRouter.patch("/delivered/:transactionId", Controller.changeStatus);
transactionRouter.patch("/succcess/:transactionId", Controller.changeStatus);

transactionRouter.patch("/:id", Controller.changeStatus);

transactionRouter.get("/history", Authentication, Controller.history);
transactionRouter.get(
  "/listTransaction/",
  Authentication,
  Controller.listTransaction
);
transactionRouter.get("/courier", AuthenCourier, Controller.listCourier);
transactionRouter.get("/customer", Authentication, Controller.listCustomer);

transactionRouter.use(Authentication);
transactionRouter.post(
  "/:atkId",
  upload.single("fileName"),
  Controller.createTransaction
);

module.exports = transactionRouter;
