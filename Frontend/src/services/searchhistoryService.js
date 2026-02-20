import api from "../api/axios";

export async function addToSearchHistory(data) {
  const res = await api.post("/searchhistory", data);
  return res.data.data;
}

export async function getSearchHistory() {
  const res = await api.get("/searchhistory");
  return res.data.data;
}

export async function removeFromSearchHistory(id) {
  const res = await api.delete(`/searchhistory/${id}`);
  return res.data.data;
}