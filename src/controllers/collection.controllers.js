const { Types: { ObjectId } } = require('mongoose')
const { Collection: Model } = require('../models/Collection.model')
const ErrorLocal = require('../utils/Error')
const { configError } = require('../helpers/catchHandler')
const MODULE = 'COLLECTION'
const { setConfigError } = configError({ module: MODULE })

const controller = {}

function validateModel ({ title, description, idUser }) {
  if (title && description && idUser) return true
  else {
    throw new ErrorLocal({
      message: 'Title or description or idUser not found',
      statusCode: 400
    })
  }
}

controller.getCollections = async (req, res, next) => {
  try {
    const collections = await Model.find({})
    res.status(200).json(collections)
  } catch (error) {
    setConfigError(error, { action: 'GET - All collections' }, next)
  }
}

controller.getCollection = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const collection = await Model.findById(id)
    res.json(collection)
  } catch (error) {
    setConfigError(error, { action: 'GET - One Collection for id' }, next)
  }
}

controller.postCollection = async (req, res, next) => {
  try {
    const collectionBody = req.body

    if (validateModel(collectionBody)) {
      const collectionToSave = new Model({
        ...collectionBody,
        idUser: ObjectId(collectionBody.idUser)
      })

      const response = await collectionToSave.save()
      res.status(200).json(response)
    }
  } catch (error) {
    setConfigError(error, { action: 'POST - Create a new collection' }, next)
  }
}

controller.updateCollection = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, description } = req.body

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    if (validateModel({ ...req.body })) {
      const response = await Model.findByIdAndUpdate(id, {
        title,
        description
      }, { new: true })
      res.status(200).json(response)
    }
  } catch (error) {
    setConfigError(error, { action: 'PUT - Update a collection for id' }, next)
  }
}

controller.deleteCollection = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    await Model.findByIdAndDelete(id)

    res.status(200).json({ message: 'Eliminado satisfactoriamente' })
  } catch (error) {
    setConfigError(error, { action: 'DELETE - A collection for id' }, next)
  }
}

module.exports = controller
