const { Router } = require('express')
const { signin, signup } = require('../controllers/auth.controller')

const route = new Router()

route.post('/signin', signin)
route.post('/signup', signup)

module.exports = route
