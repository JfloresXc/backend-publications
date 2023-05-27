const { Client: Model } = require('../models/Client.model')
const ErrorLocal = require('../utils/Error')
const { configError } = require('../helpers/catchHandler')
const MODULE = 'CLIENT'
const { setConfigError } = configError({ module: MODULE })
const { isSomeEmptyFromModel } = require('../helpers/validations')

const controller = {}

controller.getClients = async (req, res, next) => {
  try {
    const clients = await Model.find({})
    res.status(200).json(clients)
  } catch (error) {
    setConfigError(error, { action: 'GET - All clients' }, next)
  }
}

controller.getClient = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const client = await Model.findById(id)
    res.json(client)
  } catch (error) {
    setConfigError(error, { action: 'GET - One Client for id' }, next)
  }
}

controller.postModel = async (req, res, next) => {
  try {
    const body = req.body
    const { name, surname, birthdate, dni, email, phone } = body

    isSomeEmptyFromModel([name, surname, birthdate, dni, phone])
    const clientToSave = new Model({
      name,
      surname,
      birthdate,
      dni,
      email,
      phone
    })
    const response = await clientToSave.save()
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'POST - Create a new client' }, next)
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
    setConfigError(error, { action: 'PUT - Update a client for id' }, next)
  }
}

controller.deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const deletedClient = await Model.findByIdAndDelete(id)

    if (!deletedClient) {
      throw new ErrorLocal({ message: 'Client not found', statusCode: 400 })
    }

    res.status(200).json({ message: 'Eliminado satisfactoriamente' })
  } catch (error) {
    setConfigError(error, { action: 'DELETE - A client for id' }, next)
  }
}

module.exports = controller
