const { verifyToken, checkRole } = require('../middlewares/authorization.midlewares')
const { Router } = require('express')
const route = new Router()
const {
  deletePet,
  getPet,
  getPets,
  postPet,
  updatePet
} = require('../controllers/pet.controller')

route.get('/', verifyToken, checkRole('001', '1'), getPets)
route.get('/:id', verifyToken, checkRole('001', '1'), getPet)
route.post('/', verifyToken, checkRole('001', '1'), postPet)
route.put('/:id', verifyToken, checkRole('001', '1'), updatePet)
route.delete('/:id', verifyToken, checkRole('001', '1'), deletePet)

module.exports = route
