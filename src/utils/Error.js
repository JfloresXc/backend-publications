module.exports = class ErrorLocal extends Error {
  constructor ({
    message = 'WITHOUT MESSAGE',
    name = 'PersonalError',
    statusCode
  }
  ) {
    super(message)
    this.name = name
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}
