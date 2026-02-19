import { SearchhistoryModel } from "../models/searchhistory.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


async function addToSearchhistory(req, res) {
  try {
    const { query } = req.body

    if (!query) {
      throw new ApiError(400, "query is required")
    }

    const alreadyExists = await SearchhistoryModel.findOne({ userID: req.user._id, query: query })

    let search;

    if (alreadyExists) {
      search = await SearchhistoryModel.findOneAndUpdate(
        { userID: req.user._id, query },
        { $set: { query: query } },
        { new: true, upsert: true }
      )
    } else {
      search = await SearchhistoryModel.create({
        userID: req.user._id,
        query: query
      })
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, search, "new seacrh add successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message });
  }
}

async function removeFromSearchhistory(req, res) {
  try {
    const id = req.params.id

    if (!id) {
      throw new ApiError(400, "id is required")
    }

    await SearchhistoryModel.findOneAndDelete({ userID: req.user._id, _id: id })

    return res
      .status(200)
      .json(
        new ApiResponse(200, {}, "Remove successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message });
  }
}

async function getSearchhistory(req, res) {
  try {

    const searchhistory = await SearchhistoryModel
      .find({ userID: req.user._id })
      .limit(10)
      .sort({ updatedAt: -1 });

    return res
      .status(200)
      .json(
        new ApiResponse(200, searchhistory, "Search history fetched successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message });
  }
}

export {
  addToSearchhistory,
  removeFromSearchhistory,
  getSearchhistory
}