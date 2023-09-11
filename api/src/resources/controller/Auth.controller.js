// Modules
const bcrypt = require("bcryptjs");
const server = () => Promise.resolve(require("../../server"));

// Cofig
const { jwt, saltRounds } = require("../../config");

// Repositories
const userRepository = require("../repositories/user");

// Utils
const { createErrorResponse } = require("../../utils/responses");

const controller = {};

/**
 * @function private _generateToken
 * Generate JWT Token and Refresh Token to be used
 * @param {Object} user
 * @param {String} mode
 * @returns {Promise} Promise
 */
const _generateToken = async (user, mode = "default") => {
  const fastify = await server();
  const response = {};

  if (mode === "default") {
    response.userToken = fastify.jwt.sign(
      {
        sub: user.id,
        refresh: false,
      },
      {
        expiresIn: jwt.tokenExpirationTime,
      }
    );

    response.refreshToken = fastify.jwt.sign(
      {
        sub: user.id,
        refresh: true,
      },
      {
        expiresIn: jwt.refreshTokenExpirationTime,
      }
    );
  } else {
    response.forgotToken = fastify.jwt.sign(
      {
        sub: user.email,
        refresh: false,
      },
      {
        expiresIn: jwt.forgotTokenExpirationTime,
      }
    );
  }

  return Promise.resolve(response);
};

/**
 * @function private _verifyToken
 * Verify if token is valid
 * @param {String} token
 * @returns {Promise} Promise
 */
const _verifyToken = async (token) => {
  const fastify = await server();
  return fastify.jwt.verify(token);
};

/**
 * @function login
 * Auth controller login function to authenticate user
 */
controller.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userRepository.findFirst({ email: username });
    const isPasswordMatch = user ? await bcrypt.compare(password, user.password) : false;

    if (user && isPasswordMatch) {
      if (user.token !== null) {
        try {
          await _verifyToken(user.token);
          return res.code(403).send(createErrorResponse("USER_LOGGED"));
        } catch (e) {}
      }

      const { userToken, refreshToken } = await _generateToken(user);
      user.password = undefined;

      const data = {
        user,
        token: userToken,
        refreshToken,
      };

      await userRepository.update({ id: user.id }, { token: refreshToken });

      return res.send(data);
    } else {
      return res.code(401).send(createErrorResponse("AUTH_FAILED"));
    }
  } catch (e) {
    return res.code(500).send(e);
  }
};

/**
 * @function logout
 * Auth controller logout function to update user token field
 */
controller.logout = async (req, res) => {
  try {
    const userId = req.user.sub;
    const user = await userRepository.update({ id: userId }, { token: null });

    if (user) {
      const data = {
        message: "Successfully logged out!",
      };

      return res.send(data);
    } else {
      return res.code(400).send(createErrorResponse("UNEXPECTED_ERROR"));
    }
  } catch (e) {
    return res.code(500).send(e);
  }
};

/**
 * @function refreshToken
 * Auth controller refreshToken function to refresh the access token for the user
 */
controller.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = await _verifyToken(token);

    if (decoded.refresh) {
      const user = {
        id: decoded.sub,
        tenantId: decoded.subTI,
      };

      const { userToken, refreshToken } = await _generateToken(user);

      const data = {
        token: userToken,
        refreshToken,
      };

      return res.send(data);
    } else {
      return res.code(401).send(createErrorResponse("AUTH_FAILED"));
    }
  } catch (e) {
    return res.code(400).send(e);
  }
};

/**
 * @function resetPassword
 * Auth controller resetPassword function to reset user password
 */
controller.resetPassword = async (req, res) => {
  const { token, password, confirmPassword } = req.body;

  if (password === confirmPassword) {
    try {
      const decoded = await _verifyToken(token);
      const salt = bcrypt.genSaltSync(Number(saltRounds));
      await userRepository.update(
        { email: decoded.sub },
        { password: bcrypt.hashSync(password, salt) }
      );

      const data = {
        message: "Password changed",
      };

      return res.send(data);
    } catch (e) {
      return res.code(400).send(e);
    }
  } else {
    return res.code(400).send(createErrorResponse("PASS_NOT_EQ"));
  }
};

/**
 * @function verify
 * Auth controller verify function to verify if token is expired
 */
controller.verify = async (req, res) => {
  try {
    const { token } = req.body;
    await _verifyToken(token);

    const data = {
      message: "Token is valid.",
    };

    return res.send(data);
  } catch (e) {
    return res.code(401).send(e);
  }
};

module.exports = controller;
