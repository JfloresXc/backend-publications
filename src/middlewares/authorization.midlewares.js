const jwt = require('jsonwebtoken')
const ErrorLocal = require('../utils/Error')
const { errorHandler } = require('../helpers/errorHandlers')
const midlewares = {}

const MODULE = 'TOKEN'

midlewares.verifyToken = (request, response, next) => {
  try {
    const authorization = request.get('Authorization')

    if (authorization.toLowerCase().startsWith('bearer')) {
      const token = authorization.split(' ')[1] || ''
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY)

      if (decodedToken?.idUser) next()
    } else throw new ErrorLocal('No inicia con la palabra Bearer')
  } catch (error) {
    error.module = MODULE
    error.action = 'verifyToken'
    errorHandler(error, response)
  }
}

module.exports = midlewares
