const { env } = require("../config");
const fastifyPlugin = require("fastify-plugin");

// JWT Token will ignore this routes
const urlsToIgnore = [
  "/",
  "/forgot-password",
  "/login",
  "/refresh-token",
  "/reset-password",
  "/verify-token",
];

// Sentry will ignore this envs
const envsToIgnore = ["local", "test"];

module.exports = fastifyPlugin((fastify, options, next) => {
  fastify.addHook("onRequest", async (req, res) => {
    try {
      if (!urlsToIgnore.includes(req.url)) {
        await req.jwtVerify();
      }
    } catch (err) {
      res.send(err);
    }
  });

  fastify.addHook("onError", (req, res, error, done) => {
    if (!envsToIgnore.includes(env)) {
      // add sentry to log for instance
    }

    done();
  });

  next();
});
