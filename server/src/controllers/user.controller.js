import userModel from '../models/userModels.js'
import jsonwebtoken from 'jsonwebtoken'
import responseHandler from '../handlers/response.js'

const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body

    const checkUser = await userModel.findOne({ username })

    if (checkUser)
      return responseHandler.errorResponse(res, 400, 'Username already exists')

    const user = new userModel()
    user.username = username
    user.displayName = displayName
    user.setPassword(password)

    await user.save()

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.SECRET_TOKEN,
      { expiresIn: '24h' }
    )

    responseHandler.createdRequest(res, {
      token,
      ...user._doc,
      id: user.id
    })
  } catch (error) {
    return responseHandler.errorResponse(res, 400, error)
  }
}

const signin = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await userModel
      .findOne({ username })
      .select('username password salt id displayName')

    if (!user) return responseHandler.badRequest(res, 400, 'User not found')

    if (!user.validatePassword(password))
      return responseHandler.badRequest(res, 400, 'Invalid password')

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.SECRET_TOKEN,
      { expiresIn: '24h' }
    )

    user.password = undefined
    user.salt = undefined

    responseHandler.createdRequest(res, {
      token,
      ...user._doc,
      id: user.id
    })
  } catch {
    responseHandler.errorResponse(res, 400, error)
  }
}

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body

    const user = await userModel
      .findById(req.user.id)
      .select('password id salt')

    if (!user) return responseHandler.badRequest(res, 400, 'User not found')

    if (!user.validatePassword(password))
      return responseHandler.badRequest(res, 400, 'Invalid password')

    user.setPassword(newPassword)

    await user.save()

    responseHandler.okRequest(res, 'Password updated')
  } catch {
    responseHandler.errorResponse(res, 400, error)
  }
}

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id)

    if (!user) return responseHandler.notFoundRequest(res, 'User not found')

    responseHandler.okRequest(res, user)
  } catch {
    responseHandler.errorResponse(res, 400, error)
  }
}

export default { signup, signin, updatePassword, getInfo }
