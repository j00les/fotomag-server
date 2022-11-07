const Controller = require("../controller/transaction");
const AuthenCourier = require("../middleware/authenCourier");
const Authentication = require("../middleware/authentication");
const courierAuthor = require("../middleware/courierAuthor");
const customerAuthor = require("../middleware/customerAuthor");
const merchanAuthor = require("../middleware/merchantAuthor");
const upload = require("../middleware/multer");
const transactionRouter = require("express").Router();

transactionRouter.patch(
  "/progress/:transactionId",
  Authentication,
  merchanAuthor,
  Controller.changeStatusProgress
);

transactionRouter.patch(
  "/reject/:transactionId",
  Authentication,
  merchanAuthor,
  Controller.changeStatusReject
);

transactionRouter.patch(
  "/done/:transactionId",
  Authentication,
  merchanAuthor,
  Controller.changeStatusDone
);
transactionRouter.patch(
  "/delivery/:transactionId",
  AuthenCourier,
  courierAuthor,
  Controller.changeStatusDelivery
);
transactionRouter.patch(
  "/delivered/:transactionId",
  Authentication,
  courierAuthor,
  Controller.changeStatusDelivered
);
transactionRouter.patch(
  "/success/:transactionId",
  Authentication,
  customerAuthor,
  Controller.changeStatusSuccess
);

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
  upload.single("fileURL"),
  Controller.createTransaction
);

module.exports = transactionRouter;
