import api from "../api/axios";

export async function changePassword(data) {
  const res = await api.patch("/change/password", data);
  return res.data.data;
}

export async function updateAccount(data) {
  const res = await api.patch("/update/account", data);
  return res.data.data;
}

export async function updateAvatar(data) {
  const res = await api.patch("/change/avatar", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data.data;
}