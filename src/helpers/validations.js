const ErrorLocal = require('../utils/Error')
const isSomeEmpty = (values = []) => {
  return values.length > 0
    ? values.some(valueKey => !valueKey)
    : true
}

const isSomeEmptyFromModel = (values = []) => {
  const isMajorToZero = values.length > 0
  const thereIsEmpties = values.some(valueKey => !valueKey)

  if (!isMajorToZero || thereIsEmpties) {
    throw new ErrorLocal({
      message: 'Any not found',
      statusCode: 400
    })
  }
  return false
}

module.exports = { isSomeEmpty, isSomeEmptyFromModel }
