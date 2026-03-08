import api from "../api/axios";

export async function registerUser(data) {
  const res = await api.post("/users/register", data);
  return res.data.data
}

export async function loginUser(data) {
  const res = await api.post("/users/login", data);
  return res.data.data
}

export async function logoutUser() {
  const res = await api.get("/users/logout");
  return res.data.data
}

export async function getCurrentUser() {
  const res = await api.get("/users/user");
  return res.data.data
}

export async function refreshToken() {
  const res = await api.post("/users/refresh-token");
  return res.data.data
}

export async function updateProfile(data) {
  const res = await api.patch("/users/profile", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data.data;
}