// Config
const { env, jwt, logger } = require("./config");

// Require the framework and instantiate it
const fastify = require("fastify")({
  ajv: {
    customOptions: {
      allErrors: true,
    },
    plugins: [require("ajv-errors")],
  },
  bodyLimit: 1048576 * 10, // 10MB
  logger: logger[env],
});

fastify.register(require("@fastify/jwt"), {
  secret: jwt.secret,
});

fastify.register(require("@fastify/etag"));
fastify.register(require("@fastify/helmet"), { contentSecurityPolicy: false });
fastify.register(require("@fastify/cors"), { origin: "*" });
fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/multipart"));
fastify.register(require("./resources/routes"));
fastify.register(require("./hooks"));

// Declare a route
fastify.get("/", (req, res) => {
  res.send({ msg: `Welcome to API Bolttech V1 ${new Date()}` });
});

module.exports = fastify;
