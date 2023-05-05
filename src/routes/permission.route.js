const { Router } = require('express')
const { getAllPermissionss, postPermission } = require('../controllers/permission.controller')

const route = new Router()

route.get('/', getAllPermissionss)
route.post('/', postPermission)

module.exports = route
