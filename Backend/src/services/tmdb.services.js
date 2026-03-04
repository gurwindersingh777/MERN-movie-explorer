import axios from 'axios'
import ApiError from '../utils/ApiError.js';

const tmdb = axios.create({
  baseURL: process.env.TMDB_BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
  }
})

async function getCategory(media_type, category, filters) {

  try {
    const response = await tmdb.get(`/${media_type}/${category}`, { params: filters });
    const data = response.data;
    return {
      ...data, results: data.results.map(item => ({ ...item, media_type }))
    }
  } catch (error) {
    throw new ApiError(400, `Failed to get ${category} from tmdb`)
  }
}

async function getFullDetails(media_type, id) {
  try {
    const response = await tmdb.get(`/${media_type}/${id}`, {
      params: {
        append_to_response:
          "videos,credits,similar,recommendations,reviews,watch/providers"
      }
    });
    return response.data
  } catch (error) {
    throw new ApiError(400, "Failed to get details from tmdb")
  }
}

async function getDetails(media_type, id) {
  try {
    const response = await tmdb.get(`/${media_type}/${id}`);
    return response.data
  } catch (error) {
    throw new ApiError(400, "Failed to get details from tmdb")
  }
}

async function getSearch(query , page) {

  try {
    const response = await tmdb.get(`/search/multi`, { params: { query , page } });
    return response?.data
  } catch (error) {
    throw new ApiError(400, "Failed to get Search from tmdb")
  }
}

async function getCredits(media_type, id) {

  try {
    const response = await tmdb.get(`/${media_type}/${id}/credits`);
    return response?.data
  } catch (error) {
    throw new ApiError(400, "Failed to get Credits from tmdb")
  }
}

async function getVideos(media_type, id) {
  try {
    const response = await tmdb.get(`/${media_type}/${id}/videos`);
    return response?.data
  } catch (error) {
    throw new ApiError(400, "Failed to get videos from tmdb")
  }
}

async function getSimilar(media_type, id) {
  try {
    const response = await tmdb.get(`/${media_type}/${id}/similar`);
    const data = response.data;
    return {
      ...data, results: data.results.map(item => ({ ...item, media_type }))
    }
  } catch (error) {
    throw new ApiError(400, "Failed to get similar from tmdb")
  }
}

async function getRecommendations(media_type, id) {
  try {
    const response = await tmdb.get(`/${media_type}/${id}/recommendations`);
    const data = response.data;
    return {
      ...data, results: data.results.map(item => ({ ...item, media_type }))
    }
  } catch (error) {
    throw new ApiError(400, "Failed to get similar from tmdb")
  }
}

async function getDiscover(media_type, filters) {

  try {
    const response = await tmdb.get(`/discover/${media_type}`, { params: filters });
    const data = response.data;
    return {
      ...data, results: data.results.map(item => ({ ...item, media_type }))
    }
  } catch (error) {
    throw new ApiError(400, "Failed to get similar from tmdb")
  }
}

async function getTrending(media_type, time_window, filters) {

  try {
    const response = await tmdb.get(`/trending/${media_type}/${time_window}`, { params: filters });
    if (media_type !== "all") {
      const data = response.data;
      return {
        ...data, results: data.results.map(item => ({ ...item, media_type }))
      }
    }
    return response?.data
  } catch (error) {
    throw new ApiError(400, "Failed to get trending from tmdb")
  }
}

async function getGenre(media_type) {
  try {
    const response = await tmdb.get(`/genre/${media_type}/list`);
    return response?.data
  } catch (error) {
    throw new ApiError(400, "Failed to get genre from tmdb")
  }
}

async function getWatchProviders(media_type, id) {

  try {
    const response = await tmdb.get(`/${media_type}/${id}/watch/providers`);
    return response?.data
  } catch (error) {
    throw new ApiError(400, "Failed to get genre from tmdb")
  }
}

async function getReviews(media_type, id) {
  try {
    const response = await tmdb.get(`/${media_type}/${id}/reviews`);
    return response?.data
  } catch (error) {
    throw new ApiError(400, "Failed to get genre from tmdb")
  }
}

export {
  getCategory,
  getDetails,
  getFullDetails,
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
}