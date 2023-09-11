const checkDotEnv = require("../utils/env");
checkDotEnv();

const logsConfig = {
  formatters: {
    level(level) {
      return { level };
    },
  },
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
  level: process.env.LOG_LEVEL || "debug",
};

const logsDebug = {
  level: process.env.LOG_LEVEL || "debug",
};

const logger = {
  local: logsDebug,
  test: false,
  development: logsConfig,
  staging: logsConfig,
  production: logsConfig,
};

module.exports = logger;
