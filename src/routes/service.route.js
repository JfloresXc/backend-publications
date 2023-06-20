const {
  verifyToken,
  checkRole,
} = require('../middlewares/authorization.midlewares')
const { Router } = require('express')
const route = new Router()
const {
  deleteService,
  getService,
  getServices,
  postService,
  updateService,
} = require('../controllers/service.controller')

route.get('/', verifyToken, checkRole('001', '1'), getServices)
route.get('/:id', verifyToken, checkRole('001', '1'), getService)
route.post('/', verifyToken, checkRole('001', '1'), postService)
route.put('/:id', verifyToken, checkRole('001', '1'), updateService)
route.delete('/:id', verifyToken, checkRole('001', '1'), deleteService)

module.exports = route
