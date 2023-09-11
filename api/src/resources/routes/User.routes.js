const UserController = require('../controller/User.controller')
const {
  PaginationParamsSchema
} = require('../validators/User.validator')

module.exports = (server, options, done) => {
  server.get('/users', UserController.getUsers)
  server.get('/users/page-limit/:page-:limit', PaginationParamsSchema, UserController.getUsers)

  done()
}
