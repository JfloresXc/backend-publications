const { model, Schema } = require('mongoose')

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
    }
  },
  {
    timestamps: true
  }
)

module.exports = { User: model('users', User) }
