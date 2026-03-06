import api from "../api/axios";

export async function getMediaCategory(media_type, category, filters = {}) {
  const res = await api.get(`/media/${media_type}/category/${category}`, { params: filters });
  return res.data.data;
}

export async function getMediaDiscover(media_type, filters = {}) {
  const res = await api.get(`/media/${media_type}/discover`, { params: filters });
  return res.data.data;
}

export async function getMediaTrending(media_type, time_window, filters = {}) {
  const res = await api.get(`/media/trending/${media_type}/${time_window}`, { params: filters });
  return res.data.data;
}

export async function getMediaSearch(query, page = 1) {
  if (!query) return null;
  const res = await api.get(`/media/multi/search`, { params: { q: query, page } });
  return res.data.data;
}

export async function getMediaGenre(media_type) {
  const res = await api.get(`/media/${media_type}/genres`);
  return res.data.data;
}

export async function getMediaDetails(media_type, tmdbID) {
  const res = await api.get(`/media/${media_type}/${tmdbID}`);
  return res.data.data;
}

export async function getMediaCredits(media_type, tmdbID) {
  const res = await api.get(`/media/${media_type}/${tmdbID}/credits`);
  return res.data.data;
}

export async function getMediaVideos(media_type, tmdbID) {
  const res = await api.get(`/media/${media_type}/${tmdbID}/videos`);
  return res.data.data;
}

export async function getMediaSimilar(media_type, tmdbID) {
  const res = await api.get(`/media/${media_type}/${tmdbID}/similar`);
  return res.data.data;
}

export async function getMediaRecommendations(media_type, tmdbID) {
  const res = await api.get(`/media/${media_type}/${tmdbID}/recommendations`);
  return res.data.data;
}

export async function getMediaWatchProvider(media_type, tmdbID) {
  const res = await api.get(`/media/${media_type}/${tmdbID}/watch/providers`);
  return res.data.data;
}

export async function getMediaReviews(media_type, tmdbID, filters) {
  const res = await api.get(`/media/${media_type}/${tmdbID}/reviews`, { params: filters });
  return res.data.data;
}