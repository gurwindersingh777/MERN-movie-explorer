import { create } from 'zustand'
import api from '../api/axios.js'

export const useAuthStore = create((set) => ({

  user: null,
  setUser: (user) => ({ user: user }),

}))