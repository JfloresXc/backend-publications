module.exports = class ErrorLocal extends Error {
  constructor ({
    message = 'WITHOUT MESSAGE',
    module = 'WITHOUT MODULE',
    action = 'WITHOUT ACTION',
    name = 'PersonalError',
    statusCode
  }
  ) {
    super(message)
    this.module = module
    this.action = action
    this.name = name
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}
