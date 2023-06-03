const { verifyToken, checkRole } = require('../middlewares/authorization.midlewares')
const { Router } = require('express')
const route = new Router()
const {
  deleteModel,
  getCitation,
  getCitations,
  postModel,
  updateModel,
  updateState,
  rescheduleCitation,
  validateDateOfAttetion
} = require('../controllers/citation.controller')

route.get('/', verifyToken, checkRole('001', '1'), getCitations)
route.get('/:id', verifyToken, checkRole('001', '1'), getCitation)
route.get('/validateDateOfAttention/:id/:dateOfAttention/:hourOfAttention', verifyToken, checkRole('001', '1'), validateDateOfAttetion)
route.post('/', verifyToken, checkRole('001', '1'), postModel)
route.put('/:id', verifyToken, checkRole('001', '1'), updateModel)
route.put('/state/:id', verifyToken, checkRole('001', '1'), updateState)
route.put('/reschedule/:id', verifyToken, checkRole('001', '1'), rescheduleCitation)
route.delete('/:id', verifyToken, checkRole('001', '1'), deleteModel)

module.exports = route
