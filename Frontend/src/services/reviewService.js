import api from "../api/axios";

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

export async function getMediaReview(media_type, tmdbID) {
  const res = await api.get(`/review/${media_type}/${tmdbID}`);
  return res.data.data;
}

export async function getMyAllReview() {
  const res = await api.get("/review/my");
  return res.data.data;
}




