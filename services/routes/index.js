const router = require("express").Router();
const customerRouter = require("./customer");
const servicesRouter = require("./servicer");

router.use("/customer", customerRouter);
router.use("/services", servicesRouter);

module.exports = router;
