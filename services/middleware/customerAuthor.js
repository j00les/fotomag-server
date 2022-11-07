let { User } = require("../models/index");

let customerAuthor = async (req, res, next) => {
  try {
    let { id } = req.user;

    let dataUser = await User.findByPk(id);
    if (!dataUser) {
      throw { name: "Id Not Found" };
    }

    if (dataUser.role !== "Customer") {
      throw { name: "Forbiden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = customerAuthor;
