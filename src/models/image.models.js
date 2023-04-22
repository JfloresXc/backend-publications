const { model, Schema } = require('mongoose')

const Image = new Schema({
  name: {
    type: String
  },
  mimetype: {
    type: String
  },
  size: {
    type: Number
  },
  imgUrl: {
    type: String
  }
}, {
  timestamps: true
})

Image.methods.setImgUrl = function (filename) {
  const { PORT, HOST } = process.env
  this.imgUrl = `${HOST}:${PORT}/public/uploads/${filename}`
}

module.exports = model('images', Image)
