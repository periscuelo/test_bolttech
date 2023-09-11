const checkDotEnv = require("../utils/env");
const logger = require("./logger");
checkDotEnv();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.APP_PORT || 3100,
  logger,
  jwt: {
    forgotTokenExpirationTime: process.env.JWT_FT_EXPIRATION_TIME,
    refreshTokenExpirationTime: process.env.JWT_RT_EXPIRATION_TIME,
    secret: process.env.JWT_SECRET,
    tokenExpirationTime: process.env.JWT_T_EXPIRATION_TIME,
  },
  saltRounds: process.env.SALT_ROUNDS,
};

module.exports = config;
