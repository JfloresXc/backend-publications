const { model, Schema } = require('mongoose')
const { setCustomedModel } = require('../helpers/mongooseHandler')

const ModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    birthdate: {
      type: Date
    }
  },
  {
    timestamps: true
  }

)

setCustomedModel(ModelSchema)

module.exports = { Pet: model('Pet', ModelSchema) }
