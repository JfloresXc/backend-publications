const { Citation: Model } = require('../models/Citation.model')
const {
  Types: { ObjectId },
} = require('mongoose')
const ErrorLocal = require('../utils/Error')
const { configError } = require('../helpers/catchHandler')
const MODULE = 'CITATION'
const { setConfigError } = configError({ module: MODULE })
const { isSomeEmptyFromModel } = require('../helpers/validations')
const { addNewCitation, editCitation } = require('../helpers/citation.helper')
const { compareDates } = require('../utils/date')

const controller = {}

controller.getCitations = async (req, res, next) => {
  try {
    const citations = await Model.find({}).populate('pet').populate('vet')
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
      .populate('pet')
      .populate('vet')
      .populate('services')
    res.json(citation)
  } catch (error) {
    setConfigError(error, { action: 'GET - One Citation for id' }, next)
  }
}

controller.validateDateOfAttetion = async (req, res, next) => {
  try {
    const { id, dateOfAttention, hourOfAttention } = req.params

    const citations = await Model.find({})

    const citationFinded = citations.find((citation) => {
      if (citation._id.toString() === id) return false
      const dateOne = new Date(citation.dateOfAttention)
      const dateTwo = new Date(dateOfAttention)
      const hourOne = citation.hourOfAttention
      const hourTwo = hourOfAttention

      return compareDates(dateOne, dateTwo) && hourOne === hourTwo
    })

    if (citationFinded) {
      throw new ErrorLocal({
        message: 'The date and time of the appointment is occupied',
        statusCode: 400,
      })
    }

    res
      .status(200)
      .json({ message: 'The date and time of the appointment is available' })
  } catch (error) {
    setConfigError(error, { action: 'GET - One Citation for id' }, next)
  }
}

controller.postModel = async (req, res, next) => {
  try {
    const body = req.body
    const {
      speciality,
      description,
      reasonOfCitation,
      dateOfAttention,
      hourOfAttention,
      idPet,
      idVet,
      services,
    } = body

    isSomeEmptyFromModel([
      speciality,
      reasonOfCitation,
      dateOfAttention,
      hourOfAttention,
      idPet,
      idVet,
      services,
    ])

    const servicesToSave = []
    if (services?.length > 0) {
      services.forEach((idService) => {
        servicesToSave.push(ObjectId(idService))
      })
    }

    const response = await addNewCitation({
      citation: {
        speciality,
        description,
        reasonOfCitation,
        dateOfAttention,
        hourOfAttention,
        state: 1,
        pet: ObjectId(idPet),
        vet: ObjectId(idVet),
        services: servicesToSave,
      },
    })
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'POST - Create a new citation' }, next)
  }
}

controller.updateModel = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const {
      speciality,
      description,
      reasonOfCitation,
      dateOfAttention,
      hourOfAttention,
      idPet,
      idVet,
      state,
      services,
    } = body

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    isSomeEmptyFromModel([
      speciality,
      reasonOfCitation,
      dateOfAttention,
      hourOfAttention,
      idPet,
      idVet,
    ])

    const servicesToSave = []
    if (services?.length > 0) {
      services.forEach((idService) => {
        servicesToSave.push(ObjectId(idService))
      })
    }

    const response = await editCitation({
      citation: {
        speciality,
        description,
        reasonOfCitation,
        dateOfAttention,
        hourOfAttention,
        state,
        pet: ObjectId(idPet),
        vet: ObjectId(idVet),
        services: servicesToSave,
      },
      id,
    })
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'PUT - Update a citation for id' }, next)
  }
}

controller.rescheduleCitation = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const citation = await Model.findById(id)
    if (!citation)
      throw new ErrorLocal({ message: 'Citation not found', statusCode: 400 })

    const citationNew = { ...citation._doc }
    delete citationNew._id
    delete citationNew.id
    citationNew.reprogrammedCitationFather = id

    const response = await addNewCitation({ citation: citationNew })

    await editCitation({
      citation: {
        reprogrammedCitationSon: response.id,
        state: 4,
      },
      id,
    })

    res.status(200).json(response)
  } catch (error) {
    setConfigError(
      error,
      {
        action:
          'PUT - Clone a citation and change the state of the original citation',
      },
      next
    )
  }
}

controller.updateState = async (req, res, next) => {
  try {
    const { id } = req.params
    const { state } = req.body

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })
    isSomeEmptyFromModel([state])

    const response = await Model.findByIdAndUpdate(
      id,
      {
        state,
      },
      { new: true }
    )
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'PUT - Update state citation' }, next)
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
