import {
  getCategory,
  getDetails,
  getSearch,
  getCredits,
  getVideos,
  getSimilar,
  getRecommendations,
  getDiscover,
  getTrending,
  getGenre,
  getWatchProviders,
  getReviews
} from "../services/tmdb.services.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


async function getMediaCategory(req, res) {
  try {
    const page = req.query.page || 1;
    const media_type = req.params.type
    const category = req.params.category

    const result = await getCategory(media_type, category, page);

    if (!result) {
      throw new ApiError(400, `Failed to get ${category} result from tmdb`)
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, `Media fetched successfully category : ${category}`)
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMediaDetails(req, res) {

  try {
    const id = req.params?.id
    const media_type = req.params.type
    const movieDetails = await getDetails(media_type, id);

    if (!movieDetails) {
      throw new ApiError(400, `Failed to get details of ${media_type} with id ${id}`)
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, movieDetails, `Media details fetched successfully for id : ${id}`)
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMediaSearch(req, res) {

  try {
    const media_type = req.params.type
    const searchMovie = req.query.q

    if (!searchMovie) {
      throw new ApiError(400, "Search query is required")
    }

    const movie = await getSearch(media_type, searchMovie);

    if (!movie) {
      throw new ApiError(400, `Failed to search ${media_type} with query ${searchMovie}`)
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, movie, `${media_type} search results fetched successfully`)
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMediaCredits(req, res) {
  try {
    const id = req.params?.id
    const media_type = req.params.type

    if (!id) {
      throw new ApiError(400, "Media id is required")
    }

    const result = await getCredits(media_type, id);

    if (!result) {
      throw new ApiError(400, `Failed to get credits of ${media_type} with id ${id}`)
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, `Media credits fetched successfully for id : ${id}`)
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMediaVideos(req, res) {
  try {
    const id = req.params?.id
    const media_type = req.params.type

    if (!id) {
      throw new ApiError(400, "Media id is required")
    }

    const result = await getVideos(media_type, id);

    if (!result) {
      throw new ApiError(400, `Failed to get videos of ${media_type} with id ${id}`)
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, `Media videos fetched successfully for id : ${id}`)
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMediaSimilar(req, res) {
  try {
    const id = req.params?.id
    const media_type = req.params.type

    if (!id) {
      throw new ApiError(400, "Media id is required")
    }

    const result = await getSimilar(media_type, id);

    if (!result) {
      throw new ApiError(400, `Failed to get similar of ${media_type} with id ${id}`)
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, `Media similar fetched successfully for id : ${id}`)
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMediaRecommendations(req, res) {
  try {
    const id = req.params?.id
    const media_type = req.params.type

    if (!id) {
      throw new ApiError(400, "Media id is required")
    }

    const result = await getRecommendations(media_type, id);

    if (!result) {
      throw new ApiError(400, `Failed to get recommendations of ${media_type} with id ${id}`)
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, `Media recommendations fetched successfully for id : ${id}`)
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMediaDiscover(req, res) {
  try {
    const filter = req.query;
    const media_type = req.params.type
    const result = await getDiscover(media_type, filter);

    if (!result) {
      throw new ApiError(400, `Failed to discover ${media_type} with filter ${JSON.stringify(filter)}`)
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, `${media_type} discovered successfully with filter ${JSON.stringify(filter)}`)
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMediaTrending(req, res) {
  try {
    const time_window = req.params.time_window
    const media_type = req.params.type

    const result = await getTrending(media_type, time_window);

    if (!result) {
      throw new ApiError(400, `Failed to get trending ${media_type} for time window ${time_window}`)
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, `Trending ${media_type} fetched successfully for time window ${time_window}`)
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMediaGenre(req, res) {
  try {
    const media_type = req.params.type

    const result = await getGenre(media_type);

    if (!result) {
      throw new ApiError(400, `Failed to get ${media_type} genre`)
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, `${media_type} genre fetched successfully`)
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMediaWatchProvider(req, res) {
  try {
    const id = req.params?.id
    const media_type = req.params.type

    if (!id) {
      throw new ApiError(400, "Media id is required")
    }

    const result = await getWatchProviders(media_type, id);

    if (!result) {
      throw new ApiError(400, `Failed to get watch providers for ${media_type} with id ${id}`)
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, `${media_type} watch providers fetched successfully`)
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function getMediaReviews(req, res) {
  try {
    const id = req.params?.id
    const media_type = req.params.type

    if (!id) {
      throw new ApiError(400, "Media id is required")
    }

    const result = await getReviews(media_type, id);

    if (!result) {
      throw new ApiError(400, `Failed to get reviews for ${media_type} with id ${id}`)
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, `${media_type} reviews fetched successfully`)
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

export {
  getMediaCategory,
  getMediaDetails,
  getMediaSearch,
  getMediaCredits,
  getMediaVideos,
  getMediaSimilar,
  getMediaRecommendations,
  getMediaDiscover,
  getMediaTrending,
  getMediaGenre,
  getMediaWatchProvider,
  getMediaReviews
}