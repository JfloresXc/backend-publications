const express = require('express')
const morgan = require('morgan')
const fileupload = require('express-fileupload')
const cors = require('cors')
const { errorHandler } = require('../helpers/errorHandlers')
const path = require('path')
const app = express()
const { PORT = 3001 } = require('./variablesEnv')

// SETTINGS
app.set('port', PORT)

// MIDLEWARES
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(fileupload())

// ROUTES
app.use('/api/collection', require('../routes/collection.route'))
app.use('/api/publication', require('../routes/publications.route'))
app.use('/api/auth', require('../routes/auth.routes'))
app.use('/api/user', require('../routes/user.route'))
app.use('/api/role', require('../routes/role.route'))
app.use('/api/module', require('../routes/module.route'))
app.use('/api/action', require('../routes/action.route'))
app.use('/api/permission', require('../routes/permission.route'))
app.use('/api/client', require('../routes/client.route'))
app.use('/api/citation', require('../routes/citation.route'))
app.use('/api/pet', require('../routes/pet.route'))
app.use('/api/vet', require('../routes/vet.route'))
app.use('/api/service', require('../routes/service.route'))
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
