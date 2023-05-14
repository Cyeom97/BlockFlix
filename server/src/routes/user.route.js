import express from 'express'
import { body } from 'express-validator'
import favoriteController from '../controllers/favorite.controller.js'
import userController from '../controllers/user.controller.js'
import requestHandler from '../handlers/request.handler.js'
import userModel from '../models/user.model.js'
import tokenMiddlerware from '../middleware/token.middlerware.js'

const router = express.Router()

router.post(
  '/signup',
  body('username')
    .exists()
    .withMessage('Username is required')
    .isLength({ min: 8 })
    .withMessage('Username must be at least 8 characters long')
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value })
      if (user) return Promise.reject('Username is already used')
    }),
  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('confirmPassword')
    .exists()
    .withMessage('confirmPassword is required')
    .isLength({ min: 8 })
    .withMessage('Confirm password must be at least 8 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('Passwords must match')
      return true
    }),
  body('displayName')
    .exists()
    .withMessage('displayName is required')
    .isLength({ min: 8 })
    .withMessage('Display name must be at least 8 characters long'),
  requestHandler.validate,
  userController.signup
)

router.post(
  '/signin',
  body('username')
    .exists()
    .withMessage('Username is required')
    .isLength({ min: 8 })
    .withMessage('Username must be at least 8 characters long'),
  body('password')
    .isLength({ min: 8 })
    .exists()
    .withMessage('Password is required')
    .withMessage('Password must be at least 8 characters long'),
  requestHandler.validate,
  userController.signin
)

router.put(
  '/update-password',
  tokenMiddlerware.auth,
  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('newPassword')
    .exists()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long'),
  body('confirmNewPassword')
    .exists()
    .withMessage('Confirm new password is required')
    .isLength({ min: 8 })
    .withMessage('Confirm new password must be at least 8 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword)
        throw new Error('Passwords must match')
      return true
    }),
  requestHandler.validate,
  userController.updatePassword
)

router.get('/info', tokenMiddlerware.auth, userController.getInfo)

router.get(
  '/favorites',
  tokenMiddlerware.auth,
  favoriteController.getFavoritesOfUser
)

router.post(
  '/favorites',
  tokenMiddlerware.auth,
  body('mediaType')
    .exists()
    .withMessage('mediaType is required')
    .custom((type) => ['movie', 'tv'].includes(type))
    .withMessage('mediaType must be movie or tv'),
  body('mediaId')
    .exists()
    .withMessage('mediaId is required')
    .isLength({ min: 1 })
    .withMessage('MediaId must be at least 1 characters long'),
  body('mediaTitle').exists().withMessage('mediaTitle is required'),
  body('mediaPoster').exists().withMessage('mediaPoster is required'),
  body('mediaRating').exists().withMessage('mediaRating is required'),
  favoriteController.addFavorite
)

router.delete(
  '/favorites/:favoriteId',
  tokenMiddlerware.auth,
  favoriteController.removeFavorite
)

export default router
