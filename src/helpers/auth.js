const jwt = require('jsonwebtoken')
const helper = {}

helper.comparePassword = ({ password, passwordToCompare }) => {
  return password === passwordToCompare
}

helper.verifyToken = async ({ token }) => {
  const isCorrectToken = jwt.verify(
    token,
    process.env.SECRET_KEY
  )

  return Boolean(isCorrectToken)
}

module.exports = helper
