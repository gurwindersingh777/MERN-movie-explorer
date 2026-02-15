import mongoose from "mongoose";

const searchhistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  query: {
    type: String,
    required: true
  }

}, { timestamps: true });

searchhistorySchema.index({ user: 1, query: 1 }, { unique: true })

export const SearchhistoryModel = mongoose.model("Searchhistory", searchhistorySchema);