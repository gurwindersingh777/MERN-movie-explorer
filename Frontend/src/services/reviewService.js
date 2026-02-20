import api from "../api/axios";

// Review
export async function addReview(data) {
  const res = await api.post("/review", data);
  return res.data.data;
}

export async function updateReview(id, data) {
  const res = await api.patch(`/review/${id}`, data);
  return res.data.data;
}

export async function deleteReview(id) {
  const res = await api.delete(`/review/${id}`);
  return res.data.data;
}

export async function getMediaMyReview(media_type, tmdbID) {
  const res = await api.get(`/review/${media_type}/${tmdbID}`);
  return res.data.data;
}

export async function getMyAllReview() {
  const res = await api.get("/review/my");
  return res.data.data;
}

export async function getMediaAllReview() {
  const res = await api.get("/review/all");
  return res.data.data;
}

// rating

export async function addRating(data) {
  const res = await api.post("/rating", data);
  return res.data.data;
}

export async function updateRating(id, data) {
  const res = await api.patch(`/rating/${id}`, data);
  return res.data.data;
}

export async function deleteRating(id) {
  const res = await api.delete(`/rating/${id}`);
  return res.data.data;
}

export async function getMediaMyRating(media_type, tmdbID) {
  const res = await api.get(`/rating/${media_type}/${tmdbID}`);
  return res.data.data;
}

export async function getMyAllRating() {
  const res = await api.get("/rating/my");
  return res.data.data;
}
