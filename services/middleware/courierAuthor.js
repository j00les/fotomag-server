let { Courier } = require("../models/index");

let courierAuthor = async (req, res, next) => {
  try {
    let { id } = req.user;

    let dataCourier = await Courier.findByPk(id);
    if (!dataCourier) {
      throw { name: "Forbiden" };
    }

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = courierAuthor;
