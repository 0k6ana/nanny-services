<script setup>
import { onMounted, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import NannyCard from '../components/NannyCard.vue'
import NannyFilters from '../components/NannyFilters.vue'
import { useNanniesStore } from '../stores/nannies'

const nanniesStore = useNanniesStore()

const filterBy = ref('all')

const {
  nannies,
  isLoading,
  error,
  hasMore,
} = storeToRefs(nanniesStore)

onMounted(() => {
  nanniesStore.fetchNannies()
})

const loadMore = () => {
  nanniesStore.fetchNannies(true)
}

const filteredNannies = computed(() => {
  const result = [...nannies.value]

  switch (filterBy.value) {
    case 'name-asc':
      return result.sort((a, b) =>
        a.name.localeCompare(b.name)
      )

    case 'name-desc':
      return result.sort((a, b) =>
        b.name.localeCompare(a.name)
      )

    case 'price-less':
      return result.filter(
        nanny => nanny.price_per_hour < 10
      )

    case 'price-more':
      return result.filter(
        nanny => nanny.price_per_hour > 10
      )

    case 'popular':
      return result.filter(
        nanny => nanny.rating >= 4.5
      )

    case 'not-popular':
      return result.filter(
        nanny => nanny.rating < 4.5
      )

    default:
      return result
  }
})
</script>

<template>
  <section class="nannies__section">
    <div class="nannies__container">

    <NannyFilters v-model:filterBy="filterBy" />

    <p v-if="isLoading && nannies.length === 0">
      Loading...
    </p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <template v-else>
      <div>
        <NannyCard
          v-for="nanny in filteredNannies"
          :key="nanny.id"
          :nanny="nanny"
        />
      </div>

      <button
        class="button"
        v-if="hasMore"
        type="button"
        :disabled="isLoading"
        @click="loadMore"
      >
        {{ isLoading ? 'Loading...' : 'Load more' }}
      </button>
    </template>
    </div>
  </section>
</template>
<style scoped>
.nannies__section {
  min-height: 100vh;
  padding: 90px 24px 40px;

  background: #e0dddd;
  box-sizing: border-box;
}

.nannies__container {
  width: 100%;
  max-width: 1184px;
  margin: 0 auto;
}

.button {
  display: block;
  margin: 24px auto 0;
  padding: 12px 24px;

  font-size: 16px;
  color: #ffffff;

  background: red;
  border-radius: 18px;
}
</style>
