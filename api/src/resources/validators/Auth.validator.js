const schemas = {};

schemas.LoginParamsSchema = {
  schema: {
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
      required: ["username", "password"],
    },
  },
};

schemas.ResetPasswordSchema = {
  schema: {
    body: {
      type: "object",
      properties: {
        token: { type: "string" },
        password: {
          type: "string",
          minLength: 8,
          pattern: "[ !\"#$%&'()*+,\\-./:;<=>?@[\\]^_`{|}~]",
          errorMessage: {
            pattern: "should be strong, having at least 1 special character",
          },
        },
        confirmPassword: { type: "string" },
      },
      required: ["token", "password", "confirmPassword"],
    },
  },
};

schemas.TokenParamsSchema = {
  schema: {
    body: {
      type: "object",
      properties: {
        token: { type: "string" },
      },
      required: ["token"],
    },
  },
};

module.exports = schemas;
