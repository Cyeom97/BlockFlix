import responseHandler from '../handlers/response.handler.js'
import tmdbApi from '../tmdb/tmdb.api.js'
import userModel from '../models/user.model.js'
import favoriteModels from '../models/favorite.model.js'
import reviewModels from '../models/review.model.js'
import tokenMiddleware from '../middleware/token.middlerware.js'

const getList = async (req, res) => {
  try {
    const { page } = req.query
    const { mediaType, mediaCategory } = req.params

    const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page })

    return responseHandler.okRequest(res, response)
  } catch {
    responseHandler.error(res)
  }
}

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params

    const response = await tmdbApi.mediaGenres({ mediaType })

    return responseHandler.okRequest(res, response)
  } catch {
    responseHandler.badRequest(res)
  }
}

const search = async (req, res) => {
  try {
    const { mediaType } = req.params
    const { query, page } = req.query

    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === 'people' ? 'person' : mediaType
    })

    responseHandler.okRequest(res, response)
  } catch {
    responseHandler.error(res)
  }
}

const getDetails = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params

    const params = { mediaType, mediaId }

    const media = await tmdbApi.mediaDetail({ ...params })

    media.credits = await tmdbApi.mediaCredits({ ...params })

    const videos = await tmdbApi.mediaVideos({ ...params })

    media.videos = videos

    const recommendations = await tmdbApi.mediaRecommend({ ...params })

    media.recommendations = recommendations.results

    media.images = await tmdbApi.mediaImages({ ...params })

    const tokenDecoded = tokenMiddleware.tokenDecode(req)

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data)

      if (user) {
        const isFavorite = await favoriteModels.findOne({
          user: user.id,
          mediaId
        })
        media.isFavorite = isFavorite !== null
      }
    }

    media.reviews = await reviewModels
      .find({ mediaId })
      .populate('user')
      .sort('-createdAt')

    responseHandler.okRequest(res, media)
  } catch {
    responseHandler.error(res)
  }
}

export default { getList, getGenres, search, getDetails }
