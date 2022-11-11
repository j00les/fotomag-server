let { User } = require("../models/index");

let merchanAuthor = async (req, res, next) => {
  try {
    let { id } = req.user;

    let dataUser = await User.findByPk(id);
    if (!dataUser) {
      throw { name: "Id Not Found" };
    }

    if (dataUser.role !== "Merchant") {
      throw { name: "Forbiden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = merchanAuthor;
