<script setup>
defineProps({
  filterBy: {
    type: String,
    default: 'all',
  },
})

const emit = defineEmits(['update:filterBy'])
</script>

<template>
  <div class="filters">
    <label for="filter" class="filters__label">
      Filter
    </label>
    <select  class="filters__select"
      id="filter"
      :value="filterBy"
      @change="emit('update:filterBy', $event.target.value)"
    >
      <option value="all">
        Show all
      </option>

      <option value="name-asc">
        A to Z
      </option>

      <option value="name-desc">
        Z to A
      </option>

      <option value="price-less">
        Less than 10$
      </option>

      <option value="price-more">
        Greater than 10$
      </option>

      <option value="popular">
        Popular
      </option>

      <option value="not-popular">
        Not popular
      </option>
    </select>
  </div>
</template>
<style scoped>
.filters {
  display: flex;
  align-items: center;
  margin-left: 128px;
  margin-bottom: 32px;
  padding-top: 16px;
}
.filters__label{
  margin-right: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #8a8a89;
}
.filters__select {
border-radius: 14px;
padding: 16px 18px;
background-color: red;
}
</style>
