const { verifyToken, checkRole } = require('../middlewares/authorization.midlewares')
const { Router } = require('express')
const route = new Router()
const {
  getPatients,
  getPatient,
  postModel,
  updateModel,
  deletePatient
} = require('../controllers/patient.controller')

route.get('/', verifyToken, checkRole('001', '1'), getPatients)
route.get('/:id', verifyToken, checkRole('001', '1'), getPatient)
route.post('/', verifyToken, checkRole('001', '1'), postModel)
route.put('/:id', verifyToken, checkRole('001', '1'), updateModel)
route.delete('/:id', verifyToken, checkRole('001', '1'), deletePatient)

module.exports = route
