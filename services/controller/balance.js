const { User } = require("../models/index");
class Controller {
  static async topUp(req, res, next) {
    try {
      let { id } = req.params;
      let { topUp } = req.body;
      //   let { id } = req.user;
      const dataUser = await User.findOne({
        where: {
          id,
        },
      });
      await dataUser.increment("balance", { by: topUp });
      res.status(200).json({
        message: `Berhasil top up user id ${id} sebanyak Rp.${topUp}`,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
