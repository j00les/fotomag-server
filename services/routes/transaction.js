const Controller = require("../controller/transaction");
const AuthenCourier = require("../middleware/authenCourier");
const Authentication = require("../middleware/authentication");
const authorStatusSuccess = require("../middleware/authorStatusSuccess");
const courierAuthor = require("../middleware/courierAuthor");
const merchanAuthor = require("../middleware/merchantAuthor");
const upload = require("../middleware/multer");
const transactionRouter = require("express").Router();

transactionRouter.get("/", Controller.getTransaction);

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
  Controller.changeStatusDelivery
);
transactionRouter.patch(
  "/delivered/:transactionId",
  AuthenCourier,
  Controller.changeStatusDelivered
);
transactionRouter.patch(
  "/success/:transactionId",
  Authentication,
  authorStatusSuccess,
  Controller.changeStatusSuccess
);

transactionRouter.get(
  "/historyTransactionMerchant",
  Authentication,
  Controller.historyTransactionMerchant
);
transactionRouter.get(
  "/listTransactionMerchant",
  Authentication,
  Controller.listTransactionMerchant
);
transactionRouter.get(
  "/listTransactionCourier",
  AuthenCourier,
  Controller.listTransactionCourier
);
transactionRouter.get(
  "/listTransactionCustomer",
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
