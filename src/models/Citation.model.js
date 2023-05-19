const { model, Schema } = require('mongoose')
const { setCustomedModel } = require('../helpers/mongooseHandler')

const ModelSchema = new Schema(
  {
    speciality: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    dateOfAttention: {
      type: Date,
      required: true
    },
    turn: {
      type: String,
      required: true
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    }
  },
  {
    timestamps: true
  }

)

setCustomedModel(ModelSchema)

module.exports = { Citation: model('Citation', ModelSchema) }
