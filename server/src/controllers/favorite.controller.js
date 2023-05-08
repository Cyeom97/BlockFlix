import response from '../handlers/response.js'
import favoriteModels from '../models/favoriteModels.js'

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModels.findOne({
      mediaId: req.body.mediaId,
      user: req.user.id
    })

    if (isFavorite) return response.okRequest(res, isFavorite)

    const favorite = new favoriteModels({
      ...req.body,
      user: req.user.id
    })

    await favorite.save()

    response.created(res, favorite)
  } catch {
    response.errorResponse(res, 400, error)
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
    response.okRequest(res, favorite)
  } catch {
    response.errorResponse(res, 400, error)
  }
}

const getFavoritesOfUser = async (req, res) => {
  try {
    const favorite = await favoriteModels
      .find({ user: req.user.id })
      .sort('-createdAt')
    response.okRequest(res, favorite)
  } catch {
    response.errorResponse(res, 400, error)
  }
}

export default {
  addFavorite,
  removeFavorite,
  getFavoritesOfUser
}
