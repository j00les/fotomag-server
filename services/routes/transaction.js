const Controller = require("../controller/transaction");
const AuthenCourier = require("../middleware/authenCourier");
const Authentication = require("../middleware/authentication");
const upload = require("../middleware/multer");
const transactionRouter = require("express").Router();

transactionRouter.patch(
  "/progress/:transactionId",
  Controller.changeStatusProgress
);

transactionRouter.patch(
  "/reject/:transactionId",
  Controller.changeStatusReject
);

transactionRouter.patch("/done/:transactionId", Controller.changeStatusDone);
transactionRouter.patch(
  "/delivery/:transactionId",
  Controller.changeStatusDelivery
);
transactionRouter.patch(
  "/delivered/:transactionId",
  Controller.changeStatusDelivered
);
transactionRouter.patch(
  "/succcess/:transactionId",
  Controller.changeStatusSuccess
);

// transactionRouter.patch("/:id", Controller.changeStatus);

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
