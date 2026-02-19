import mongoose from "mongoose";

const searchhistorySchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  query: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }

}, { timestamps: true });

searchhistorySchema.index({ userID: 1, query: 1 }, { unique: true })

export const SearchhistoryModel = mongoose.model("Searchhistory", searchhistorySchema);