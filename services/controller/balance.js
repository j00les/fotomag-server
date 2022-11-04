const { User } = require("../models/index");
class Controller {
  static async topUp(req, res, next) {
    try {
      let { topUp } = req.body;
      //   let { id } = req.user;
      const dataTopUp = await User.update(
        {
          balance: topUp,
        },
        {
          where: {
            id: 1,
          },
        }
      );
      res.status(200).json({
        message: `Berhasil top up user id  sebanyak Rp.${topUp}`,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
