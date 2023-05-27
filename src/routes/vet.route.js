const { verifyToken, checkRole } = require('../middlewares/authorization.midlewares')
const { Router } = require('express')
const route = new Router()
const {
  deleteVet,
  getVet,
  getVets,
  postModel,
  updateModel
} = require('../controllers/vet.controller')

route.get('/', verifyToken, checkRole('001', '1'), getVets)
route.get('/:id', verifyToken, checkRole('001', '1'), getVet)
route.post('/', verifyToken, checkRole('001', '1'), postModel)
route.put('/:id', verifyToken, checkRole('001', '1'), updateModel)
route.delete('/:id', verifyToken, checkRole('001', '1'), deleteVet)

module.exports = route
