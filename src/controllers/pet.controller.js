const { Pet: Model } = require('../models/Pet.model')
const ErrorLocal = require('../utils/Error')
const { configError } = require('../helpers/catchHandler')
const MODULE = 'PET'
const { setConfigError } = configError({ module: MODULE })
const { isSomeEmptyFromModel } = require('../helpers/validations')

const controller = {}

controller.getPets = async (req, res, next) => {
  try {
    const pets = await Model.find({})
    res.status(200).json(pets)
  } catch (error) {
    setConfigError(error, { action: 'GET - All pets' }, next)
  }
}

controller.getPet = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const pet = await Model.findById(id)
    res.json(pet)
  } catch (error) {
    setConfigError(error, { action: 'GET - One Pet for id' }, next)
  }
}

controller.postPet = async (req, res, next) => {
  try {
    const body = req.body
    const { name, surname, birthdate } = body

    isSomeEmptyFromModel([name, surname, birthdate])
    const petToSave = new Model({
      name,
      surname,
      birthdate
    })
    const response = await petToSave.save()
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'POST - Create a new pet' }, next)
  }
}

controller.updatePet = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const { name, surname, birthdate } = body

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    isSomeEmptyFromModel([name, surname, birthdate])

    const response = await Model.findByIdAndUpdate(id, {
      name,
      surname,
      birthdate
    }, { new: true })
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'PUT - Update a pet for id' }, next)
  }
}

controller.deletePet = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const deletedPet = await Model.findByIdAndDelete(id)

    if (!deletedPet) {
      throw new ErrorLocal({ message: 'Pet not found', statusCode: 400 })
    }

    res.status(200).json({ message: 'Eliminado satisfactoriamente' })
  } catch (error) {
    setConfigError(error, { action: 'DELETE - A pet for id' }, next)
  }
}

module.exports = controller