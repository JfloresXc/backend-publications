const { Role: Model } = require('../models/Role.model')
const { configError } = require('../helpers/catchHandler')
const MODULE = 'ROLE'
const { setConfigError } = configError({ module: MODULE })

const controller = {}

controller.getRoles = async (req, res, next) => {
  try {
    const roles = await Model.find()
      .populate('role')
    res.status(200).json(roles)
  } catch (error) {
    setConfigError(error, { action: 'GET - All publications' }, next)
  }
}

module.exports = controller
