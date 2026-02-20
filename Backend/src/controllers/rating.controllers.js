import { RatingModel } from "../models/rating.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"


async function addRating(req, res) {
  try {
    const { tmdbID, media_type, rating } = req.body

    if (rating < 1 || rating > 10) {
      throw new ApiError(400, "Enter rating between 1 - 10")
    }

    const alreadyExists = await RatingModel.findOne({
      userID: req.user._id,
      tmdbID: tmdbID,
      media_type: media_type
    })

    if (alreadyExists) {
      throw new ApiError(400, "Already rated")
    }

    const result = await RatingModel.create({
      tmdbID: tmdbID,
      media_type: media_type,
      rating: rating,
      userID: req.user._id
    })

    return res
      .status(201)
      .json(
        new ApiResponse(201, result, "Rating added successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function updateRating(req, res) {
  try {
    const { rating } = req.body
    const id = req.params.id

    if (rating < 1 || rating > 10) {
      throw new ApiError(400, "Enter rating between 1 - 10")
    }

    const result = await RatingModel.findOneAndUpdate(
      { _id: id, userID: req.user._id },
      { rating: rating }
    )

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, "Rating update successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function removeRating(req, res) {
  try {
    const id = req.params.id

    const result = await RatingModel.findOneAndDelete(
      { _id: id, userID: req.user._id },
    )

    if (!result) {
      throw new ApiError(400, "Rating does not exists")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, {}, "ratings remove successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMediaMyRating(req, res) {
  try {

    const tmdbID = req.params.tmdbID
    const media_type = req.params.media_type
    
    const result = await RatingModel.findOne(
      { media_type: media_type, tmdbID: tmdbID, userID: req.user._id },
    )

    if (!result) {
      throw new ApiError(400, "Rating does not exists")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, "Rating fetched successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMyAllRating(req, res) {
  try {
    const result = await RatingModel.find(
      { userID: req.user._id }
    )

    if (!result) {
      throw new ApiError(400, "Rating does not exists")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, "User all ratings fetched successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}




export {
  addRating,
  updateRating,
  getMediaMyRating,
  getMyAllRating,
  removeRating
}