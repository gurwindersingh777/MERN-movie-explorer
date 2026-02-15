import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tmdbID: {
    type: Number,
    required: true
  },
  media_type: {
    type: String,
    enum: ["movie", "tv"],
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  }
}, { timestamps: true })

ratingSchema.index({ user: 1, tmdbID: 1 }, { unique: true })

export const RatingModel = mongoose.model("Rating", ratingSchema)