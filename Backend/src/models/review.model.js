import mongoose, { model } from "mongoose";

const reviewSchema = new mongoose.Schema({
  userID: {
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
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

reviewSchema.index({ userID: 1, tmdbID: 1 }, { unique: true })

export const ReviewModel = mongoose.model("Review", reviewSchema)