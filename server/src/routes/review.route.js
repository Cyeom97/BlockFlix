import express from 'express'
import { body } from 'express-validator'
import reviewController from '../controllers/review.controller.js'
import tokenMiddlerware from '../middleware/token.middlerware.js'
import requestHandler from '../handlers/request.handler.js'

const router = express.Router({ mergeParams: true })

router.get('/', tokenMiddlerware.auth, reviewController.getReviewsOfUser)

router.post(
  '/',
  tokenMiddlerware.auth,
  body('mediaId')
    .exists()
    .withMessage('Media ID is required')
    .isLength({ min: 1 })
    .withMessage('Media ID must be at least 1 chars long'),
  body('content')
    .exists()
    .withMessage('Content is required')
    .isLength({ min: 1 })
    .withMessage('Content must be at least 1 chars long'),
  body('mediaType')
    .exists()
    .withMessage('Media type is required')
    .custom((type) => ['movie', 'tv'].includes(type))
    .withMessage('Media type must be movie or tv'),
  body('mediaTitle').exists().withMessage('Media title is required'),
  body('mediaPoster').exists().withMessage('Media poster is required'),
  requestHandler.validate,
  reviewController.create
)

router.delete('/:reviewId', tokenMiddlerware.auth, reviewController.remove)

export default router
