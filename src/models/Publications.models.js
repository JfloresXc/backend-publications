const { model, Schema, Types } = require('mongoose')
const { setCustomedModel } = require('../helpers/mongooseHandler')

const Publication = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    idCollection: {
      type: Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true
  }

)

setCustomedModel(Publication)

module.exports = model('publications', Publication)
