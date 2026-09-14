<script setup>
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import NannyCard from '../components/NannyCard.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const { user, isLoading } = storeToRefs(authStore)

const favorites = ref([])

const loadFavorites = () => {
  if (!user.value) {
    favorites.value = []
    return
  }

  const key = `favorites_${user.value.uid}`

  favorites.value = JSON.parse(
    localStorage.getItem(key) || '[]'
  )
}

onMounted(() => {
  loadFavorites()
})

const hasFavorites = computed(() => favorites.value.length > 0)
</script>

<template>
<section class="favorites__section">
  <div class="favorites__container">

    <p v-if="isLoading">
      Loading...
    </p>

    <p v-else-if="!user">
      Please log in to view your favorites.
    </p>

    <template v-else-if="hasFavorites">
      <div>
        <NannyCard
          v-for="nanny in favorites"
          :key="nanny.id"
          :nanny="nanny"
        />
      </div>
    </template>

    <p v-else>
      You haven't added any nannies to your favorites yet.
    </p>
    </div>
  </section>
</template>
<style scoped>
.favorites__section {
  min-height: 100vh;
  padding: 90px 24px 40px;

  background: #e0dddd;
  box-sizing: border-box;
}

.favorites__container {
  width: 100%;
  max-width: 1184px;
  margin: 0 auto;
}</style>
