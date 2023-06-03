const { Citation: ModelHelper } = require('../models/Citation.model')
const helper = {}

helper.addNewCitation = async ({ citation }) => {
  const citationToSave = new ModelHelper(citation)
  const response = await citationToSave.save()
  return response
}

helper.editCitation = async ({ citation, id }) => {
  const response = await ModelHelper.findByIdAndUpdate(id, citation, { new: true })
  return response
}

module.exports = helper
