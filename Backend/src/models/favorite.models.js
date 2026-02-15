import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  tmdbID: {
    type: Number,
    required: true
  },
  media_type: {
    type: String,
    enum: ["movie", "tv"],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

favoriteSchema.index({ user: 1, tmdbID: 1 }, { unique: true })

export const FavoriteModel = mongoose.model("Favorite", favoriteSchema);