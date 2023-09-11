// Repositories
const userRepository = require("../repositories/user");

// Utils
const { createErrorResponse } = require("../../utils/responses");

const controller = {};

/**
 * @function getUsers
 * User controller getUsers function to grab a list of users
 */
controller.getUsers = async (req, res) => {
  try {
    const { page, limit } = req.params;
    const where = {};
    const users = await userRepository.findMany({ where, page, limit });
    const total = await userRepository.count(where);

    if (total > 0) {
      for (const user of users) {
        user.password = undefined;
      }

      const data = {
        users,
        total,
      };

      return res.send(data);
    } else {
      return res.code(404).send(createErrorResponse("NOT_FOUND", "Users"));
    }
  } catch (e) {
    return res.code(500).send(e);
  }
};

module.exports = controller;
