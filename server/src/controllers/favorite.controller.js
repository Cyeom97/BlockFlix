import responseHandler from '../handlers/response.handler.js'
import favoriteModels from '../models/favorite.model.js'

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModels.findOne({
      mediaId: req.body.mediaId,
      user: req.user.id
    })

    if (isFavorite) return responseHandler.okRequest(res, isFavorite)

    const favorite = new favoriteModels({
      ...req.body,
      user: req.user.id
    })

    await favorite.save()

    responseHandler.created(res, favorite)
  } catch {
    responseHandler.errorResponse(res, 400, error)
  }
}

const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params

    const favorite = await favoriteModels.findOne({
      user: req.user.id,
      _id: favoriteId
    })

    if (!favorite) return response.notFound(res, 'Favorite not found')

    await favorite.remove()
    responseHandler.okRequest(res, favorite)
  } catch {
    responseHandler.errorResponse(res, 400, error)
  }
}

const getFavoritesOfUser = async (req, res) => {
  try {
    const favorite = await favoriteModels
      .find({ user: req.user.id })
      .sort('-createdAt')
    responseHandler.okRequest(res, favorite)
  } catch {
    responseHandler.errorResponse(res, 400, error)
  }
}

export default {
  addFavorite,
  removeFavorite,
  getFavoritesOfUser
}
