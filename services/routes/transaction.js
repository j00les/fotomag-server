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
  "/success/:transactionId",
  Controller.changeStatusSuccess
);

// transactionRouter.patch("/:id", Controller.changeStatus);

transactionRouter.get(
  "/history",
  Authentication,
  Controller.historyTransactionMerchant
);
transactionRouter.get(
  "/listTransaction/",
  Authentication,
  Controller.listTransactionMerchant
);
transactionRouter.get(
  "/courier",
  AuthenCourier,
  Controller.listTransactionCourier
);
transactionRouter.get(
  "/customer",
  Authentication,
  Controller.listTransactionCustomer
);

transactionRouter.use(Authentication);
transactionRouter.post(
  "/:atkId",
  upload.single("fileName"),
  Controller.createTransaction
);

module.exports = transactionRouter;
