const { User: Model } = require('../models/Users.models')
const ErrorLocal = require('../utils/Error')
const { configError } = require('../helpers/catchHandler')
const MODULE = 'PUBLICATION'
const { setConfigError } = configError({ module: MODULE })

const controller = {}

controller.getUsers = async (req, res, next) => {
  try {
    const publications = await Model.find({})
    res.status(200).json(publications)
  } catch (error) {
    setConfigError(error, { action: 'GET - All publications' }, next)
  }
}

controller.getUser = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new ErrorLocal({ message: 'Id not found', statusCode: 400 })

    const publication = await Model.findById(id)
    res.json(publication)
  } catch (error) {
    setConfigError(error, { action: 'GET - One User for id' }, next)
  }
}

module.exports = controller
