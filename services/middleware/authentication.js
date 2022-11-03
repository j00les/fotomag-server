const { verifyAccessToken } = require("../helper/helper");

const Authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    let payload = verifyAccessToken(access_token);
    let dataUser = await User.findByPk(payload.id);
    if (!dataUser) {
      throw { name: "Invalid access_token" };
    }

    req.user = {
      id: dataUser.id,
      email: dataUser.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Authentication;
