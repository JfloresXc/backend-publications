const { User: UserModel } = require('../models/User.model')
const jwt = require('jsonwebtoken')
const { comparePassword } = require('../helpers/auth')
const { configError } = require('../helpers/catchHandler')
const ErrorLocal = require('../utils/Error')
const MODULE = 'AUTH'
const { setConfigError } = configError({ module: MODULE })
const controller = {}

function validateModel ({ email, password }) {
  if (email && password) return true
  else {
    throw new ErrorLocal({
      message: 'Email or password not found',
      statusCode: 500
    })
  }
}

const getToken = async ({ email, password }) => {
  console.log(email, password)
  validateModel({ email, password })

  const user = await UserModel.findOne({ email })
  if (!user) throw new ErrorLocal({ message: 'User not found', statusCode: 405 })

  const isExist = comparePassword({
    password,
    passwordToCompare: user.password || ''
  })
  if (!isExist) throw new ErrorLocal({ message: 'Incorrect password', statusCode: 405 })

  const token = jwt.sign(
    { idUser: user._id, username: user.username },
    process.env.SECRET_KEY,
    {
      expiresIn: '7d'
    }
  )

  return { token }
}

controller.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const { token } = await getToken({ email, password })

    res.status(202).json({
      message: 'Token received',
      token
    })
  } catch (error) {
    setConfigError(error, { action: 'POST - Signin user' }, next)
  }
}

controller.signup = async (req, res, next) => {
  try {
    const { email, username = '', password } = req.body
    if (!email || !password) throw new ErrorLocal({ message: 'User or password is empty' })

    const user = await UserModel.findOne({ email })
    if (user) throw new ErrorLocal({ message: 'User already created', statusCode: 405 })
    if (password.length < 4) throw new ErrorLocal({ message: 'Password length is greater than 3' })

    const userToCreate = new UserModel({
      email,
      username,
      password
    })
    await userToCreate.save()

    const { token } = await getToken({ email, password })

    res.status(202).json({ email, username, token })
  } catch (error) {
    setConfigError(error, { action: 'POST - Signup user' }, next)
  }
}

module.exports = controller
