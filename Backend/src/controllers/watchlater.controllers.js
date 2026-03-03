import { WatchlaterModel } from "../models/watchlater.models.js"
import { getDetails } from "../services/tmdb.services.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"


async function addToWatchlater(req, res) {
  try {

    const { media_type, tmdbID } = req.body

    if (!media_type || !tmdbID) {
      throw new ApiError(400, "All fields are required")
    }

    const alreadyExists = await WatchlaterModel.findOne({
      user: req.user._id,
      tmdbID: Number(tmdbID),
      media_type
    });

    if (alreadyExists) {
      throw new ApiError(400, "Already added in watchlaters")
    }

    const watchlater = await WatchlaterModel.create({
      tmdbID: Number(tmdbID),
      media_type: media_type,
      user: req.user._id
    })

    if (!watchlater) {
      throw new ApiError(400, "Failed to add in watchlaters")
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, watchlater, "Added to Watchlater")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getWatchlater(req, res) {
  try {
    const tmdbID = req.params.id

    const watchlaterExists = await WatchlaterModel.findOne({ tmdbID: tmdbID, user: req.user._id })

    if (!watchlaterExists) {
      throw new ApiError(400, "Failed to get watchalater")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, watchlaterExists, "Watchlater fetched successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getAllWatchlater(req, res) {
  try {
    
    const watchlaterList = await WatchlaterModel.find({ user: req.user._id })

    if (!watchlaterList.length) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, [], "No watchlater items")
        );
    }

    const detailedList = await Promise.all(
      watchlaterList.map(async (item) => {
        const details = await getDetails(item.media_type, item.tmdbID)
        return { ...details }
      })
    )

    return res
      .status(200)
      .json(
        new ApiResponse(200, detailedList, "Watchlater fetched successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function removeFromWatchlater(req, res) {
  try {
    const id = req.params.id

    if (!id) {
      throw new ApiError(400, "Id is required")
    }

    await WatchlaterModel.findOneAndDelete({ _id: id, user: req.user._id });

    return res
      .status(200)
      .json(
        new ApiResponse(200, {}, "Successfully deleted from watchlater")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}
export {
  addToWatchlater,
  getWatchlater,
  removeFromWatchlater,
  getAllWatchlater
}