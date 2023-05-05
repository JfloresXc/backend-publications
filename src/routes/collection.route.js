const { verifyToken, checkRole } = require('../middlewares/authorization.midlewares')
const { Router } = require('express')
const route = new Router()
const {
  postCollection,
  getCollection,
  getCollections
} = require('../controllers/collection.controllers')

route.get('/', verifyToken, checkRole('001', '1'), getCollections)
route.get('/:id', verifyToken, getCollection)
route.post('/', verifyToken, postCollection)

module.exports = route
