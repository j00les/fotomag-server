const router = require("express").Router();
const courierRouter = require("./courier");
const customerRouter = require("./customer");
const servicesRouter = require("./servicer");

router.use("/customer", customerRouter);
router.use("/servicer", servicesRouter);
router.use("/courier", courierRouter);

module.exports = router;
