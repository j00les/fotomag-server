const router = require("express").Router();
const balanceRouter = require("./balance");
const courierRouter = require("./courier");
const customerRouter = require("./customer");
const loginRouter = require("./login");
const servicesRouter = require("./servicer");
const transactionRouter = require("./transaction");

router.use("/login", loginRouter);
router.use("/customer", customerRouter);
router.use("/merchant", servicesRouter);
router.use("/courier", courierRouter);
router.use("/balance", balanceRouter);
router.use("/transaction", transactionRouter);

module.exports = router;
