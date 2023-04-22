const dotenv = require('dotenv')
const { app, server } = require('./config/server')

dotenv.config()
require('./config/database')

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message)
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  process.exit(1)
})

module.exports = { app, server }
