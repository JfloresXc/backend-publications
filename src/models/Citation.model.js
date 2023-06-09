const { model, Schema } = require('mongoose')
const { setCustomedModel } = require('../helpers/mongooseHandler')

const ModelSchema = new Schema(
  {
    speciality: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    reasonOfCitation: {
      type: String,
      required: true,
    },
    dateOfAttention: {
      type: Date,
      required: true,
    },
    hourOfAttention: {
      type: String,
      required: true,
    },
    state: {
      type: Number,
      default: 1,
    },
    reprogrammedCitationSon: {
      type: String,
      default: '-1',
    },
    reprogrammedCitationFather: {
      type: String,
      default: '-1',
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
    vet: {
      type: Schema.Types.ObjectId,
      ref: 'Vet',
      required: true,
    },
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  },
  {
    timestamps: true,
  }
)

setCustomedModel(ModelSchema)

module.exports = { Citation: model('Citation', ModelSchema) }
