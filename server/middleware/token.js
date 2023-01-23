import jsonwebtoken from 'jsonwebtoken'
import responseHandler from '../handlers/response.js'
import userModel from '../models/userModels'

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers['authorization']
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1]
      return jsonwebtoken.verify(token, process.env.SECRET_TOKEN)
    }
    return false
  } catch {
    return false
  }
}

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req)
  if (!tokenDecoded) {
    return responseHandler.unauthorizedRequest(res)
  }
  const user = await userModel.findById(tokenDecoded.data)

  if (!user) {
    return responseHandler.unauthorizedRequest(res)
  }
  req.user = user
  next()
}

export default { auth, tokenDecode }
