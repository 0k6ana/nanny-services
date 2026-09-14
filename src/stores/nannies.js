import { defineStore } from 'pinia'
import { getNannies } from '../firebase/nannies'

export const useNanniesStore = defineStore('nannies', {
  state: () => ({
    nannies: [],
    isLoading: false,
    error: null,
    page: 0,
    limit: 3,
    hasMore: true,
  }),

  actions: {
    async fetchNannies(loadMore = false) {
      this.isLoading = true
      this.error = null

      try {
        const startIndex = loadMore ? this.page * this.limit : 0

        const data = await getNannies(this.limit, startIndex)

        if (loadMore) {
          this.nannies.push(...data)
        } else {
          this.nannies = data
        }

        this.page += 1

        if (data.length < this.limit) {
          this.hasMore = false
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },
  },
})
