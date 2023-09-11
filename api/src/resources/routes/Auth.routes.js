const AuthController = require("../controller/Auth.controller");
const {
  LoginParamsSchema,
  ResetPasswordSchema,
  TokenParamsSchema,
} = require("../validators/Auth.validator");

module.exports = (server, options, done) => {
  server.post("/login", LoginParamsSchema, AuthController.login);
  server.post("/logout", AuthController.logout);
  server.post("/refresh-token", TokenParamsSchema, AuthController.refreshToken);
  server.post("/reset-password", ResetPasswordSchema, AuthController.resetPassword);
  server.post("/verify-token", TokenParamsSchema, AuthController.verify);

  done();
};
