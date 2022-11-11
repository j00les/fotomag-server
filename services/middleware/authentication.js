const { verifyAccessToken } = require("../helper/helper");
const { User } = require("../models/index");

const Authentication = async (req, res, next) => {
  try {
    // console.log(req.headers);
    const { access_token } = req.headers;
    let payload = verifyAccessToken(access_token);
    // console.log(payload, '<><><><><><> INI PAYLOAD DARI AUTHEN')
    let dataUser = await User.findOne({
      where: {
        email: payload.email,
      },
    });
    if (!dataUser) {
      throw { name: "Invalid access_token" };
    }

    req.user = {
      id: dataUser.id,
      email: dataUser.email,
      role: dataUser.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Authentication;
