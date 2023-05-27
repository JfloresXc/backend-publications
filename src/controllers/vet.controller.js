const { Vet: Model } = require('../models/Vet.model')
const ErrorLocal = require('../utils/Error')
const { configError } = require('../helpers/catchHandler')
const MODULE = 'VET'
const { setConfigError } = configError({ module: MODULE })
const { isSomeEmptyFromModel } = require('../helpers/validations')

const controller = {}

controller.getVets = async (req, res, next) => {
  try {
    const vets = await Model.find({})
    res.status(200).json(vets)
  } catch (error) {
    setConfigError(error, { action: 'GET - All vets' }, next)
  }
}

controller.getVet = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const vet = await Model.findById(id)
    res.json(vet)
  } catch (error) {
    setConfigError(error, { action: 'GET - One Vet for id' }, next)
  }
}

controller.postModel = async (req, res, next) => {
  try {
    const body = req.body
    const { name, surname, birthdate, dni, email, phone } = body

    isSomeEmptyFromModel([name, surname, birthdate, dni, phone])
    const vetToSave = new Model({
      name,
      surname,
      birthdate,
      dni,
      email,
      phone
    })
    const response = await vetToSave.save()
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'POST - Create a new vet' }, next)
  }
}

controller.updateModel = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const { name, surname, birthdate, dni, email, phone } = body

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    isSomeEmptyFromModel([name, surname, birthdate, dni, phone])

    const response = await Model.findByIdAndUpdate(id, {
      name,
      surname,
      birthdate,
      dni,
      email,
      phone
    }, { new: true })
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'PUT - Update a vet for id' }, next)
  }
}

controller.deleteVet = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const deletedVet = await Model.findByIdAndDelete(id)

    if (!deletedVet) {
      throw new ErrorLocal({ message: 'Vet not found', statusCode: 400 })
    }

    res.status(200).json({ message: 'Eliminado satisfactoriamente' })
  } catch (error) {
    setConfigError(error, { action: 'DELETE - A vet for id' }, next)
  }
}

module.exports = controller
