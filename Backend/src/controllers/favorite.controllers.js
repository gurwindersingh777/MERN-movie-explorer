import { FavoriteModel } from "../models/favorite.models.js";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

async function addToFavorite(req, res) {
  try {
    const { media_type, tmdbID, title, poster_path ,overview } = req.body

    if (!media_type || !tmdbID || !title || !poster_path || !overview) {
      throw new ApiError(400, "All fields are required")
    }
    console.log("sdc");

    const alreadyExists = await FavoriteModel.findOne({
      user: req.user._id,
      tmdbID: Number(tmdbID),
      media_type
    });

    
    console.log(alreadyExists);
    

    if (alreadyExists) {
      throw new ApiError(400, "Already added in Favorites")
    }

    const favorite = await FavoriteModel.create({
      tmdbID: Number(tmdbID),
      media_type: media_type,
      title,
      overview,
      poster_path,
      user: req.user._id
    })

    console.log(favorite);
    

    if (!favorite) {
      throw new ApiError(400, "Failed to add in favorite")
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
    const tmdbID = req.params.id

    const favorite = await FavoriteModel.findOne({ tmdbID: tmdbID, user: req.user._id })

    if (!favorite) {
      throw new ApiError(400, "Failed to get favorites")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, favorite, "favorite fetched successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getAllFavorite(req, res) {
  try {

    const page = req.query.page || 1
    const limit = 10
    const skip = (page - 1) * limit;

    const total = await FavoriteModel.countDocuments({ user: req.user._id })
    const totalPages = Math.ceil(total / limit)

    const favoriteList = await FavoriteModel
      .find({ user: req.user._id })
      .skip(skip)
      .limit(limit)

    if (!favoriteList.length) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, [], "No favorites items")
        );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { results: favoriteList, page, totalPages }, "Favorites fetched successfully")
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

    await FavoriteModel.findOneAndDelete({ _id: id, user: req.user._id });

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
  getAllFavorite,
  removeFromFavorite
}