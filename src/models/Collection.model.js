const { model, Schema, Types } = require('mongoose')

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

Collection.set('toJSON', {
  transform: (document, object) => {
    object.id = object._id
    delete object._id
    delete object.__v
  }
})

module.exports = { Collection: model('collections', Collection) }
