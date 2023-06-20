const { model, Schema } = require('mongoose')
const { setCustomedModel } = require('../helpers/mongooseHandler')

const SchemaModel = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      unique: true,
    },
    duration: {
      type: String,
    },
    price: {
      type: Number,
    },
    state: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
)

setCustomedModel(SchemaModel)

module.exports = { Service: model('Service', SchemaModel) }
