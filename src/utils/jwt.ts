const { JwtSecret, JwtExpired } = require("../config/index");
const jwt = require("jsonwebtoken");

const createJWT = ({ payload }: any) => {
  const token = jwt.sign(payload, JwtSecret, {
    expiresIn: JwtExpired,
  });
  return token;
};

const verifyJWT = ({ token }: any) => jwt.verify(token, JwtSecret);

module.exports = {
  createJWT,
  verifyJWT,
};
