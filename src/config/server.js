const express = require('express')
const morgan = require('morgan')
const fileupload = require('express-fileupload')
const cors = require('cors')
const { errorHandler } = require('../helpers/errorHandlers')
const path = require('path')
const app = express()

// SETTINGS
app.set('port', process.env.PORT || 3001)

// MIDLEWARES
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(fileupload())

// ROUTES
app.use('/api/publication', require('../routes/publications.routes'))
app.use('/api/auth', require('../routes/auth.routes'))
app.use('/api/collection', require('../routes/collection.route'))
app.use((error, request, response, next) => {
  errorHandler(error, response)
})

// STATICS
const publicPath = path.resolve(__dirname, '../storage')
app.use(express.static(publicPath))

// LISTEN
const server = app.listen(app.get('port'), () =>
  console.log('Server on port ' + app.get('port'))
)

module.exports = { app, server }
