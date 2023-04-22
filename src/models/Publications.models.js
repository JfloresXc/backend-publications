const { model, Schema, Types } = require('mongoose')

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

Publication.set('toJSON', {
  transform: (document, object) => {
    object.id = object._id
    delete object._id
    delete object.__v
  }
})

module.exports = model('publications', Publication)
