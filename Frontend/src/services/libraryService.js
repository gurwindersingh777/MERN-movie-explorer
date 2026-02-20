import api from "../api/axios";

// WATCHLATER

export async function addToWatchlater(data) {
  const res = await api.post("/watchlater", data);
  return res.data.data;
}

export async function getWatchlater() {
  const res = await api.get("/watchlater");
  return res.data.data;
}

export async function removeFromWatchlater(id) {
  const res = await api.delete(`/watchlater/${id}`);
  return res.data.data;
}

// FAVORITE

export async function addToFavorite(data) {
  const res = await api.post("/favorite", data);
  return res.data.data;
}

export async function getFavorite() {
  const res = await api.get("/favorite");
  return res.data.data;
}

export async function removeFromFavorite(id) {
  const res = await api.delete(`/favorite/${id}`);
  return res.data.data;
}