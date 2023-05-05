const { Router } = require('express')
const { getAllActions, postAction } = require('../controllers/action.controller')

const route = new Router()

route.get('/', getAllActions)
route.post('/', postAction)

module.exports = route
