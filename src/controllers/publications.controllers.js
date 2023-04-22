const { Types: { ObjectId } } = require('mongoose')
const Publication = require('../models/Publications.models')
const ErrorLocal = require('../utils/Error')
const { configError } = require('../helpers/catchHandler')
const MODULE = 'PUBLICATION'
const { setConfigError } = configError({ module: MODULE })

const controller = {}

function validateModel ({ title, description }) {
  if (title && description) return true
  else {
    throw new ErrorLocal({
      message: 'Title or description or idCollection not found',
      statusCode: 400
    })
  }
}

controller.getPublications = async (req, res, next) => {
  try {
    const publications = await Publication.find({})
    res.status(200).json(publications)
  } catch (error) {
    setConfigError(error, { action: 'GET - All publications' }, next)
  }
}

controller.getPublicationForIdCollection = async (req, res, next) => {
  try {
    const { idCollection } = req.params

    console.log(idCollection)
    const publications = await Publication.find({ idCollection: ObjectId(idCollection) })
    res.status(200).json(publications)
  } catch (error) {
    setConfigError(error, { action: 'GET - All publications' }, next)
  }
}

controller.getPublication = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const publication = await Publication.findById(id)
    res.json(publication)
  } catch (error) {
    setConfigError(error, { action: 'GET - One Publication for id' }, next)
  }
}

controller.postPublication = async (req, res, next) => {
  try {
    const publicationBody = req.body

    if (validateModel(publicationBody)) {
      const publicationToSave = new Publication({
        ...publicationBody,
        idCollection: ObjectId(publicationBody.idCollection)
      })
      const response = await publicationToSave.save()
      res.status(200).json(response)
    }
  } catch (error) {
    setConfigError(error, { action: 'POST - Create a new publication' }, next)
  }
}

controller.updatePublication = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, description } = req.body

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    if (validateModel({ ...req.body })) {
      const response = await Publication.findByIdAndUpdate(id, {
        title,
        description
      }, { new: true })
      res.status(200).json(response)
    }
  } catch (error) {
    setConfigError(error, { action: 'PUT - Update a publication for id' }, next)
  }
}

controller.deletePublication = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    await Publication.findByIdAndDelete(id)

    res.status(200).json({ message: 'Eliminado satisfactoriamente' })
  } catch (error) {
    setConfigError(error, { action: 'DELETE - A publication for id' }, next)
  }
}

module.exports = controller
