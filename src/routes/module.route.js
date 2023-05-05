const { Router } = require('express')
const { postModule, getAllModules } = require('../controllers/module.controller')

const route = new Router()

route.get('/', getAllModules)
route.post('/', postModule)

module.exports = route
