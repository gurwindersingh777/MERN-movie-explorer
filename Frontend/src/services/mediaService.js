import api from "../api/axios";

export async function getMediaCategory(media_type, category) {
  const res = await api.get(`/media/${media_type}/category/${category}`);
  return res.data.data;
}

export async function getMediaDiscover(media_type, filters = {}) {
  const res = await api.get(`/media/${media_type}/discover`, { params: filters });
  return res.data.data;
}

export async function getMediaTrending(time_window) {
  const res = await api.get(`/media/trending/${time_window}`);
  return res.data.data;
}

export async function getMediaSearch(query) {
  if (!query) return null;
  const res = await api.get(`/media/multi/search`, { params: { q: query } });
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

export async function getMediaReviews(media_type, tmdbID, page = 1, limit = 10) {
  const res = await api.get(`/media/${media_type}/${tmdbID}/reviews`, { params: { page, limit } });
  return res.data.data;
}