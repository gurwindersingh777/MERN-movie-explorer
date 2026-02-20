import { create } from 'zustand'
import api from '../api/axios.js'

export const useAuthStore = create((set) => ({

  user: null,
  loading: false,

  registerUser: async (data) => {

    set({ loading: true })

    try {
      const res = await api.post("/users/register", data ,{ headers: { "Content-Type": "multipart/form-data" } })

      const { user, accessToken } = res.data.data;

      localStorage.setItem("accessToken", accessToken)
      set({ user })

    } catch (error) {
      console.log(error.response?.data.error || error.message);
    } finally {
      set({ loading: false })
    }

  },

  loginUser: async (data) => {
    set({ loading: true })
    try {
      const res = await api.post("/users/login", data);

      const { user, accessToken } = res.data.data

      localStorage.setItem("accessToken", accessToken)
      set({ user })

    } catch (error) {
      console.log(error.response?.data.error || error.message);
    } finally {
      set({ loading: false })
    }
  },

  logoutUser: async () => {
    set({ loading: true })
    try {
      await api.get("/users/logout");

      localStorage.removeItem("accessToken")
      set({ user: null })

    } catch (error) {
      console.log(error.response?.data.error || error.message);
    } finally {
      set({ loading: false })
    }
  },

  getCurrentUser: async () => {
    set({ loading: true })
    try {
      const res = await api.get("/users/user");
      set({ user: res.data.data.user })
    } catch (error) {
      console.log(error.response?.data.error || error.message);
    } finally {
      set({ loading: false })
    }
  },

  refreshToken: async () => {
    try {
      const res = await api.post("/users/refresh-token");
      const { accessToken } = res.data.data;
      localStorage.setItem("accessToken", accessToken)
    } catch (error) {
      console.log(error.response?.data.error || error.message);
    }
  }

}))