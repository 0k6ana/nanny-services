import { defineStore } from 'pinia'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '../firebase/config'
import { registerUser, loginUser, logoutUser } from '../firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoading: true,
  }),

  actions: {
    register(email, password) {
      return registerUser(email, password)
    },

    login(email, password) {
      return loginUser(email, password)
    },

    logout() {
      return logoutUser()
    },

    initAuth() {
      onAuthStateChanged(auth, (user) => {
        this.user = user
        this.isLoading = false
      })
    },
  },
})
