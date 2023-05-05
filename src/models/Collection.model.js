const { model, Schema, Types } = require('mongoose')
const { setCustomedModel } = require('../helpers/mongooseHandler')

const Collection = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    idUser: {
      type: Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true
  }

)

setCustomedModel(Collection)

module.exports = { Collection: model('Collection', Collection) }
