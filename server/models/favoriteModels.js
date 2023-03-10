import mongoose, { Schema } from 'mongoose'
import modelOptions from './model.options.js'

export default mongoose.model(
  'Favorite',
  mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      mediaType: {
        type: String,
        enum: ['movie', 'tv'],
        required: true
      },
      mediaId: {
        type: Number,
        required: true
      },
      mediaTitle: {
        type: String,
        required: true
      },
      mediaPoster: {
        type: String,
        required: true
      },
      mediaRating: {
        type: Number,
        required: true
      }
    },
    modelOptions
  )
)
