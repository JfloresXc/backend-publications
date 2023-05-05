const helper = {}
helper.setCustomedModel = (Schema) => {
  Schema.set('toJSON', {
    transform: (document, object) => {
      object.id = object._id
      delete object._id
      delete object.__v
    }
  })
}

module.exports = helper
