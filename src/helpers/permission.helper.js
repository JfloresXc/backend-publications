const { Permission: PermissionModel } = require('../models/Permission.model')
const helper = {}

helper.getPermissionsForIdRole = async ({ idRole }) => {
  const permisos = await PermissionModel.find({ role: idRole })
  return permisos
}

module.exports = helper
