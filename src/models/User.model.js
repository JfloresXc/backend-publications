const { model, Schema, Types } = require('mongoose')

const User = new Schema(
  {
    username: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: Types.ObjectId,
      ref: 'Role'
    },
    state: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
)

User.set('toJSON', {
  transform: (document, object) => {
    object.id = object._id
    delete object._id
    delete object.__v
  }
})

module.exports = { User: model('users', User) }
