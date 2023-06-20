const { Service: Model } = require('../models/Service.model')
const ErrorLocal = require('../utils/Error')
const { configError } = require('../helpers/catchHandler')
const MODULE = 'PET'
const { setConfigError } = configError({ module: MODULE })
const { isSomeEmptyFromModel } = require('../helpers/validations')

const controller = {}

controller.getServices = async (req, res, next) => {
  try {
    const services = await Model.find()
    res.status(200).json(services)
  } catch (error) {
    setConfigError(error, { action: 'GET - All services' }, next)
  }
}

controller.getService = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const service = await Model.findById(id).populate('client')
    res.json(service)
  } catch (error) {
    setConfigError(error, { action: 'GET - One Service for id' }, next)
  }
}

controller.postService = async (req, res, next) => {
  try {
    const body = req.body
    const { name, description, price, duration } = body

    isSomeEmptyFromModel([name, price, duration])
    const serviceToSave = new Model({
      name,
      description,
      price,
      duration,
    })
    const response = await serviceToSave.save()
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'POST - Create a new service' }, next)
  }
}

controller.updateService = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const body = req.body
    const { name, description, price, duration } = body

    isSomeEmptyFromModel([name, price, duration])

    const response = await Model.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        duration,
      },
      { new: true }
    )
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'PUT - Update a service for id' }, next)
  }
}

controller.deleteService = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const deletedService = await Model.findByIdAndDelete(id)

    if (!deletedService) {
      throw new ErrorLocal({ message: 'Service not found', statusCode: 400 })
    }

    res.status(200).json({ message: 'Eliminado satisfactoriamente' })
  } catch (error) {
    setConfigError(error, { action: 'DELETE - A service for id' }, next)
  }
}

module.exports = controller
