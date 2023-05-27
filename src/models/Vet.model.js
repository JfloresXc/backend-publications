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
      type: Date,
      required: true
    },
    dni: {
      type: String,
      required: true,
      minlength: 8,
      unique: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }

)

setCustomedModel(ModelSchema)

module.exports = { Vet: model('Vet', ModelSchema) }
