const { Module: Model } = require('../models/Module.model')
const { configError } = require('../helpers/catchHandler')
const MODULE = 'MODULE'
const { setConfigError } = configError({ module: MODULE })
const { isSomeEmptyFromModel } = require('../helpers/validations')

const controller = {}

controller.postModule = async (req, res, next) => {
  try {
    const body = req.body
    const { name, description, state, code } = body
    if (isSomeEmptyFromModel([name, code])) return

    const moduleSave = new Model({
      name, description, state, code
    })
    const response = await moduleSave.save()
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'POST - Create a new module' }, next)
  }
}

controller.getAllModules = async (req, res, next) => {
  try {
    const modules = await Model.find({})
    res.status(200).json(modules)
  } catch (error) {
    setConfigError(error, { action: 'GET - All modules' }, next)
  }
}

module.exports = controller
