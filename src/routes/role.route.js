const { Router } = require('express')
const { getRoles } = require('../controllers/role.controller')

const route = new Router()

route.get('/', getRoles)

module.exports = route
