const isEmpty = (values = []) => {
  return values.length > 0
    ? values.some(valueKey => !valueKey)
    : true
}

module.exports = { isEmpty }
