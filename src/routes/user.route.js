const { Router } = require('express')
const { getUsers } = require('../controllers/user.controller')
const { verifyToken, checkRole } = require('../middlewares/authorization.midlewares')

const route = new Router()

route.get('/', verifyToken, checkRole(['administrator']), getUsers)

module.exports = route
