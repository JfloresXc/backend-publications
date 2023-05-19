const { verifyToken, checkRole } = require('../middlewares/authorization.midlewares')
const { Router } = require('express')
const route = new Router()
const {
  deleteModel,
  getCitation,
  getCitations,
  postModel,
  updateModel
} = require('../controllers/citation.controller')

route.get('/', verifyToken, checkRole('001', '1'), getCitations)
route.get('/:id', verifyToken, checkRole('001', '1'), getCitation)
route.post('/', verifyToken, checkRole('001', '1'), postModel)
route.put('/:id', verifyToken, checkRole('001', '1'), updateModel)
route.delete('/:id', verifyToken, checkRole('001', '1'), deleteModel)

module.exports = route
