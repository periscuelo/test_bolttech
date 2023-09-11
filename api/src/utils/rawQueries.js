/**
 * Prisma Raw Query Executor
 * Used on cases of unsupported fields
 * @module rawQuery
 */

const rawQuery = (prisma, query, obj) => {
  const execute = async (resolve, reject) => {
    try {
      const count = await prisma.$executeRaw(query)
      const response = {
        ...obj,
        affectedRows: count
      }
      prisma.$disconnect()

      return resolve(response)
    } catch (e) {
      return reject(e)
    }
  }

  return new Promise((resolve, reject) => execute(resolve, reject))
}

module.exports = rawQuery
