import { FavoriteModel } from "../models/favorite.models.js";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

async function addToFavorite(req, res) {
  try {
    const { media_type, tmdbID } = req.body

    if (!media_type || !tmdbID) {
      throw new ApiError(400, "All fields are required")
    }

    const alreadyExists = await FavoriteModel.findOne({
      userID: req.user._id,
      tmdbID,
      media_type
    });

    if (alreadyExists) {
      throw new ApiError(400, "Already added in Favorites")
    }

    const favorite = await FavoriteModel.create({
      tmdbID: tmdbID,
      media_type: media_type,
      userID: req.user._id
    })

    if (!favorite) {
      throw new ApiError(400, "Failed to create favorite")
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, favorite, "Added to favorites")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getFavorite(req, res) {
  try {
    const favoriteList = await FavoriteModel.find({ userID: req.user._id })

    if (!favoriteList) {
      throw new ApiError(400, "Failed to get favorites")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, favoriteList, "favorite fetched successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function removeFromFavorite(req, res) {
  try {
    const id = req.params.id

    if (!id) {
      throw new ApiError(400, "Id is required")
    }

    await FavoriteModel.findOneAndDelete({ _id: id, userID: req.user._id });

    return res
      .status(200)
      .json(
        new ApiResponse(200, {}, "Successfully deleted from favorites")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}
export {
  addToFavorite,
  getFavorite,
  removeFromFavorite
}