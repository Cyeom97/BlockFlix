import responseHandler from '../handlers/response.handler.js'
import reviewModel from '../models/review.model.js'

const create = async (req, res) => {
  try {
    const { movieId } = req.params

    const review = new reviewModel({
      user: req.user.id,
      movieId,
      ...req.body
    })

    await review.save()

    responseHandler.createdRequest(res, {
      ...review._doc,
      id: review.id,
      user: req.user
    })
  } catch {
    responseHandler.error(res)
  }
}

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params

    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id
    })

    if (!review) return responseHandler.notFoundRequest(res)

    await review.remove()

    responseHandler.okRequest(res)
  } catch {
    responseHandler.error(res)
  }
}

const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({
        user: req.user.id
      })
      .sort('-createdAt')

    responseHandler.okRequest(res, reviews)
  } catch {
    responseHandler.error(res)
  }
}

export default { create, remove, getReviewsOfUser }
