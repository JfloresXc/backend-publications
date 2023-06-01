const { Types: { ObjectId } } = require('mongoose')
const { Permission: Model } = require('../models/Permission.model')
const { configError } = require('../helpers/catchHandler')
const MODULE = 'MODULE'
const { setConfigError } = configError({ module: MODULE })
const { isSomeEmptyFromModel } = require('../helpers/validations')

const controller = {}

controller.postPermission = async (req, res, next) => {
  try {
    const body = req.body
    const { codeModule, codeAction, idRole } = body
    if (isSomeEmptyFromModel([codeModule, codeAction, idRole])) return

    const permissionSave = new Model({
      codeModule, codeAction, role: ObjectId(idRole)
    })
    const response = await permissionSave.save()
    res.status(200).json(response)
  } catch (error) {
    setConfigError(error, { action: 'POST - Create a new permission' }, next)
  }
}

controller.getAllPermissionss = async (req, res, next) => {
  try {
    const permissions = await Model.find({})
    res.status(200).json(permissions)
  } catch (error) {
    setConfigError(error, { action: 'GET - All permissions' }, next)
  }
}

module.exports = controller
