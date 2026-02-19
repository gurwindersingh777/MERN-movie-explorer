import { ReviewModel } from "../models/review.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

async function addReview(req, res) {
  try {
    const { tmdbID, media_type, content } = req.body

    if (!content) {
      throw new ApiError(400, "Content is required")
    }

    const alreadyExists = await ReviewModel.findOne({ tmdbID, media_type, userID: req.user._id });

    if (alreadyExists) {
      throw new ApiError(400, "Already reviewed")
    }

    const review = await ReviewModel.create({
      tmdbID: tmdbID,
      media_type: media_type,
      content: content,
      userID: req.user._id
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
    const id = req.params.id

    if (!content) {
      throw new ApiError(400, "Content is required")
    }

    const review = await ReviewModel.findOneAndUpdate(
      { _id: id, userID: req.user._id },
      { content: content }
    )


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

    const result = await ReviewModel.findOneAndDelete(
      { _id: id, userID: req.user._id },
    )

    if (!result) {
      throw new ApiError(400, "Review does not exists")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, {}, "Review delete successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getReview(req, res) {
  try {

    const tmdbID = req.params.tmdbID
    const media_type = req.params.media_type

    const result = await ReviewModel.findOne(
      { media_type: media_type, tmdbID: tmdbID, userID: req.user._id },
    )

    if (!result) {
      throw new ApiError(400, "Review does not exists")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, "Review fetched successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMyReview(req, res) {
  try {
    const result = await ReviewModel.find(
      { userID: req.user._id }
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

async function getAllReview(req, res) {
  try {
    const media_type = req.params.media_type
    const tmdbID = req.params.tmdbID
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const review = await ReviewModel.find({ media_type, tmdbID }).limit(limit).skip(skip)

    if (review.length === 0) {
      throw new ApiError(400, "Review does not exists")
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, review, "All users reviews fetched successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

export {
  addReview,
  updateReview,
  deleteReview,
  getReview,
  getMyReview,
  getAllReview
}