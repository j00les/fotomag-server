const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "finalProjectNiBoss";

const hashingPassword = (password) => bcrypt.hashSync(password);
const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

const createAccessToken = (payload) => jwt.sign(payload, secretKey);
const verifyAccessToken = (access_token) => jwt.verify(access_token, secretKey);

module.exports = {
  hashingPassword,
  comparePassword,
  createAccessToken,
  verifyAccessToken,
};
