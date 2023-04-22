const utils = {}

utils.validatePublication = ({ title, description }) => {
  return Boolean(title && description)
}

module.exports = utils
