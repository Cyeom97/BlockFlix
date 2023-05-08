import response from '../handlers/response.js'
import reviewModels from '../models/reviewModels.js'

const create = async (req, res) => {
  try {
    const { movieId } = req.params

    const review = new reviewModels({
      ...req.body,
      movieId,
      user: req.user.id
    })

    await review.save()

    response.created(res, {
      ...review._doc,
      user: req.user,
      id: review.id
    })
  } catch {
    response.errorResponse(res, 400, error)
  }
}

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params

    const review = await reviewModels.findOne({
      user: req.user.id,
      _id: reviewId
    })

    if (!review) return response.notFound(res, 'Review not found')

    await review.remove()
    response.okRequest(res, review)
  } catch {
    response.errorResponse(res, 400, error)
  }
}

const getReviewsOfUser = async (req, res) => {
  try {
    const review = await reviewModels
      .find({ user: req.user.id })
      .sort('-createdAt')
    response.okRequest(res, review)
  } catch {
    response.errorResponse(res, 400, error)
  }
}

export default {
  create,
  remove,
  getReviewsOfUser
}
