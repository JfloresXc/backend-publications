const { User: Model } = require('../models/User.model')
const ErrorLocal = require('../utils/Error')
const { configError } = require('../helpers/catchHandler')
const MODULE = 'PUBLICATION'
const { setConfigError } = configError({ module: MODULE })

const controller = {}

controller.getUsers = async (req, res, next) => {
  try {
    const users = await Model.find()
      .populate('role')
    res.status(200).json(users)
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
