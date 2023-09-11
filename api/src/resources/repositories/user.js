const prisma = require("../../../prisma");
const user = {};

/**
 * @function private _defaultWhere
 * Generate WHERE common conditions to be used in queries
 * @param {Object} queryConditions
 * @returns {Object} Object
 */
const _defaultWhere = (queryConditions) => {
  return {
    where: queryConditions,
    include: {
      userInProjects: {
        select: {
          projectId: true,
          project: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  };
};

/**
 * @param {Object} queryConditions
 * @returns {Promise} Promise
 */
user.count = (queryConditions) => {
  return prisma.user.count({ where: queryConditions });
};

/**
 * @param {Object} queryConditions
 * @returns {Promise} Promise
 */
user.findFirst = (queryConditions) => {
  return prisma.user.findFirst(_defaultWhere(queryConditions));
};

/**
 * @param {Object} queryConditions
 * @param {Number} page
 * @param {Number} limit
 * @returns {Promise} Promise
 */
user.findMany = ({ queryConditions, page, limit }) => {
  const LIMIT = Number(limit) || 0;
  const OFFSET = (Number(page) - 1) * LIMIT;
  const query = _defaultWhere(queryConditions);

  // pagination
  if (LIMIT > 0) {
    query.take = LIMIT;
    query.skip = OFFSET;
  }

  return prisma.user.findMany(query);
};

/**
 * @param {Object} queryConditions
 * @param {Object} dataToUpdate
 * @returns {Promise} Promise
 */
user.update = (queryConditions, dataToUpdate) => {
  return prisma.user.update({
    where: queryConditions,
    data: dataToUpdate,
  });
};

module.exports = user;
