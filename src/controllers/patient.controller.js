const { Patient: Model } = require('../models/Patient.model')
const { Types: { ObjectId } } = require('mongoose')
const ErrorLocal = require('../utils/Error')
const { configError } = require('../helpers/catchHandler')
const MODULE = 'PUBLICATION'
const { setConfigError } = configError({ module: MODULE })
const { isSomeEmptyFromModel } = require('../helpers/validations')

const controller = {}

controller.getPatients = async (req, res, next) => {
  try {
    const patients = await Model.find({})
    res.status(200).json(patients)
  } catch (error) {
    setConfigError(error, { action: 'GET - All patients' }, next)
  }
}

controller.getPatient = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const patient = await Model.findById(id)
    res.json(patient)
  } catch (error) {
    setConfigError(error, { action: 'GET - One Patient for id' }, next)
  }
}

controller.postModel = async (req, res, next) => {
  try {
    const body = req.body
    const { name, surname, birthdate, dni, email, phone } = body

    isSomeEmptyFromModel([name, surname, birthdate, dni, phone])
    const patientToSave = new Model({
      name,
      surname,
      birthdate,
      dni,
      email,
      phone
    })
    const response = await patientToSave.save()
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'POST - Create a new patient' }, next)
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
    setConfigError(error, { action: 'PUT - Update a patient for id' }, next)
  }
}

controller.deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const deletedPatient = await Model.findByIdAndDelete(id)

    if (!deletedPatient) {
      throw new ErrorLocal({ message: 'Patient not found', statusCode: 400 })
    }

    res.status(200).json({ message: 'Eliminado satisfactoriamente' })
  } catch (error) {
    setConfigError(error, { action: 'DELETE - A patient for id' }, next)
  }
}

module.exports = controller
