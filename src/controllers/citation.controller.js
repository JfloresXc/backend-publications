const { Citation: Model } = require('../models/Citation.model')
const { Types: { ObjectId } } = require('mongoose')
const ErrorLocal = require('../utils/Error')
const { configError } = require('../helpers/catchHandler')
const MODULE = 'PUBLICATION'
const { setConfigError } = configError({ module: MODULE })
const { isSomeEmptyFromModel } = require('../helpers/validations')

const controller = {}

controller.getCitations = async (req, res, next) => {
  try {
    const citations = await Model.find({})
    res.status(200).json(citations)
  } catch (error) {
    setConfigError(error, { action: 'GET - All citations' }, next)
  }
}

controller.getCitation = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const citation = await Model.findById(id)
    res.json(citation)
  } catch (error) {
    setConfigError(error, { action: 'GET - One Citation for id' }, next)
  }
}

controller.postModel = async (req, res, next) => {
  try {
    const body = req.body
    const { speciality, description, dateOfAttention, turn, idPatient } = body

    isSomeEmptyFromModel([speciality, description, dateOfAttention, turn, idPatient])

    const citationToSave = new Model({
      speciality,
      description,
      dateOfAttention,
      turn,
      patient: ObjectId(idPatient)
    })
    const response = await citationToSave.save()
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'POST - Create a new citation' }, next)
  }
}

controller.updateModel = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const { speciality, description, dateOfAttention, turn, idPatient } = body

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    isSomeEmptyFromModel([speciality, description, dateOfAttention, turn, idPatient])

    const response = await Model.findByIdAndUpdate(id, {
      speciality,
      description,
      dateOfAttention,
      turn,
      patient: ObjectId(idPatient)
    }, { new: true })
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'PUT - Update a citation for id' }, next)
  }
}

controller.deleteModel = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const deletedCitation = await Model.findByIdAndDelete(id)

    if (!deletedCitation) {
      throw new ErrorLocal({ message: 'Citation not found', statusCode: 400 })
    }

    res.status(200).json({ message: '¡Deleted successfully!' })
  } catch (error) {
    setConfigError(error, { action: 'DELETE - A citation for id' }, next)
  }
}

module.exports = controller