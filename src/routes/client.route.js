const { verifyToken, checkRole } = require('../middlewares/authorization.midlewares')
const { Router } = require('express')
const route = new Router()
const {
  getClients,
  getClient,
  postModel,
  updateModel,
  deleteClient
} = require('../controllers/client.controller')

route.get('/', verifyToken, checkRole('001', '1'), getClients)
route.get('/:id', verifyToken, checkRole('001', '1'), getClient)
route.post('/', verifyToken, checkRole('001', '1'), postModel)
route.put('/:id', verifyToken, checkRole('001', '1'), updateModel)
route.delete('/:id', verifyToken, checkRole('001', '1'), deleteClient)

module.exports = route
