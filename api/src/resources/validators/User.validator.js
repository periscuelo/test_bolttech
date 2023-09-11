const schemas = {}

schemas.PaginationParamsSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        page: { type: 'number' },
        limit: { type: 'number' }
      },
      required: ['page', 'limit']
    }
  }
}

module.exports = schemas
