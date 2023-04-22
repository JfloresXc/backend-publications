let MODULE = 'NOT MODULE'

const setConfigError = (error, { action }, next) => {
  error.module = MODULE
  error.action = action
  next(error)
}

const configError = ({ module }) => {
  MODULE = module
  return { setConfigError }
}

module.exports = { configError }
