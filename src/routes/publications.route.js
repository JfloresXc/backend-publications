const { verifyToken, checkRole } = require('../middlewares/authorization.midlewares')
const { Router } = require('express')
const route = new Router()
const {
  postPublication,
  updatePublication,
  deletePublication,
  // getPublication,
  getPublicationForIdCollection,
  getPublications
} = require('../controllers/publications.controllers')

route.get('/', verifyToken, checkRole(['admin']), getPublications)
route.get('/forIdCollection/:idCollection', verifyToken, getPublicationForIdCollection)
// route.get('/:id', verifyToken, getPublication)
route.post('/', verifyToken, postPublication)
route.put('/:id', verifyToken, updatePublication)
route.delete('/:id', verifyToken, deletePublication)
// route.post('/title', postPublicationsTitle)

module.exports = route
