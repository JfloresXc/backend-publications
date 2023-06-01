const { model, Schema, Types } = require('mongoose')
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
    },
    specie: { // Especie
      type: String
    },
    breed: { // Raza
      type: String
    },
    weight: {
      type: Number,
      required: true
    },
    medicalInformation: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    client: {
      type: Types.ObjectId,
      ref: 'Client',
      required: true
    }
  },
  {
    timestamps: true
  }

)

setCustomedModel(ModelSchema)

module.exports = { Pet: model('Pet', ModelSchema) }
