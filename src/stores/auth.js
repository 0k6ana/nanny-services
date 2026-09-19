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
    register(name, email, password) {
      return registerUser(name, email, password)
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
