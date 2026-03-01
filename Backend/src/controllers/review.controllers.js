import { ReviewModel } from "../models/review.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

async function addReview(req, res) {
  try {

    const { tmdbID, media_type, content, rating } = req.body

    if (!content) {
      throw new ApiError(400, "Content is required")
    }
    if (rating === null) {
      throw new ApiError(400, "Rating is required")
    }

    const alreadyExists = await ReviewModel.findOne({ tmdbID, media_type, user: req.user._id });

    if (alreadyExists) {
      throw new ApiError(400, "You already reviewed this media");
    }

    const review = await ReviewModel.create({
      tmdbID: tmdbID,
      media_type: media_type,
      content: content,
      rating: rating,
      user: req.user._id
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, review, "Review added successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function updateReview(req, res) {
  try {
    const { content } = req.body
    const { rating } = req.body

    const review = await ReviewModel.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        content,
        rating
      },
      { new: true }
    )

    if (!review) {
      throw new ApiError(404, "Review not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, review, "Review updated successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function deleteReview(req, res) {
  try {

    const id = req.params.id

    await ReviewModel.findOneAndDelete(
      { _id: id, user: req.user._id },
    )

    return res
      .status(200)
      .json(
        new ApiResponse(200, {}, "Review delete successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMediaReview(req, res) {
  try {

    const myReview = await ReviewModel.findOne({
      media_type: req.params.media_type,
      tmdbID: req.params.tmdbID,
      user: req.user._id
    },).populate("user", "username avatar")

    const otherReviews = await ReviewModel.find({
      media_type: req.params.media_type,
      tmdbID: req.params.tmdbID,
      user: { $ne: req.user._id }
    }).populate("user", "username avatar")

    return res
      .status(200)
      .json(
        new ApiResponse(200, { myReview, otherReviews } || null, "Review fetched successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMyAllReview(req, res) {
  try {
    const result = await ReviewModel.find(
      { user: req.user._id }
    )

    if (!result) {
      throw new ApiError(400, "Review does not exists")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, "User all review fetched successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}


export {
  addReview,
  updateReview,
  deleteReview,
  getMediaReview,
  getMyAllReview,
}