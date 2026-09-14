```vue
<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '../stores/auth'

const props = defineProps({
  nanny: {
    type: Object,
    required: true,
  },
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const isFavorite = ref(false)
const isExpanded = ref(false)

const getFavoritesKey = () => {
  if (!user.value) {
    return null
  }

  return `favorites_${user.value.uid}`
}

const checkFavorite = () => {
  const key = getFavoritesKey()

  if (!key) {
    isFavorite.value = false
    return
  }

  const favorites = JSON.parse(
    localStorage.getItem(key) || '[]'
  )

  isFavorite.value = favorites.some(
    nanny => nanny.id === props.nanny.id
  )
}

const toggleFavorite = () => {
  if (!user.value) {
    alert('This feature is available only for authorized users.')
    return
  }

  const key = getFavoritesKey()

  const favorites = JSON.parse(
    localStorage.getItem(key) || '[]'
  )

  if (isFavorite.value) {
    const updatedFavorites = favorites.filter(
      nanny => nanny.id !== props.nanny.id
    )

    localStorage.setItem(
      key,
      JSON.stringify(updatedFavorites)
    )

    isFavorite.value = false
  } else {
    favorites.push(props.nanny)

    localStorage.setItem(
      key,
      JSON.stringify(favorites)
    )

    isFavorite.value = true
  }
}

const toggleReadMore = () => {
  isExpanded.value = !isExpanded.value
}

onMounted(() => {
  checkFavorite()
})
</script>

<template>
  <article class="nanny-card">
    <button
      class="favorite-button"
      type="button"
      @click="toggleFavorite"
    >
      {{ isFavorite ? '♥' : '♡' }}
    </button>

    <div class="nanny-card__top">
      <img
        class="nanny-card__avatar"
        :src="nanny.avatar_url"
        :alt="nanny.name"
      />
<div class="nanny-card__info">

  <div class="nanny-card__name">
    <p class="nanny-label">Nanny</p>
    <h2>{{ nanny.name }}</h2>
  </div>

  <div class="nanny-card__meta">
    <span>📍 {{ nanny.location }}</span>
    <span class="meta-divider"></span>
    <span>⭐ Rating: {{ nanny.rating }}</span>
    <span class="meta-divider"></span>
    <span>
      Price / 1 hour:
      <strong>${{ nanny.price_per_hour }}</strong>
    </span>
  </div>

</div>
    </div>

    <div class="nanny-card__details">
  <p>
    <strong>Age:</strong>
    {{ nanny.birthday }}
  </p>

  <p>
    <strong>Experience:</strong>
    {{ nanny.experience }}
  </p>

  <p>
    <strong>Kids Age:</strong>
    {{ nanny.kids_age }}
  </p>

  <p>
    <strong>Education:</strong>
    {{ nanny.education }}
  </p>

</div>

    <div class="nanny-card__characters">
      <span
        v-for="character in nanny.characters"
        :key="character"
      >
        {{ character }}
      </span>
                  <p>
        {{ nanny.about }}
      </p>
    </div>

    <div class="nanny-card__reviews">
      <p>
        Reviews: {{ nanny.reviews.length }}
      </p>
    </div>

    <button
      class="read-more-button"
      type="button"
      @click="toggleReadMore"
    >
      {{ isExpanded ? 'Read less' : 'Read more' }}
    </button>
    <div v-if="isExpanded">
      <div >
        <h3>Reviews</h3>

        <article
          v-for="review in nanny.reviews"
          :key="review.reviewer"
        >
          <h4>{{ review.reviewer }}</h4>

          <p>
            Rating: {{ review.rating }}
          </p>

          <p>
            {{ review.comment }}
          </p>
        </article>
      </div>
        <button
          class="appointment-button"
          type="button">
           Make an appointment
        </button>
    </div>
  </article>
</template>
<style scoped>
.nanny-card {
  position: relative;
  width: 100%;
  max-width: 1184px;
  margin: 0 auto 24px;
  padding: 24px 32px 30px;
  background: #f1efef;
  border-radius: 24px;
  box-sizing: border-box;
  border: #a8a8af 1px solid;
}

.nanny-card__top {
  display: flex;
  align-items: flex-start;
  gap: 30px;
}

.nanny-card__avatar {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  padding: 12px;
  object-fit: cover;
  border: 2px solid rgba(240, 63, 59, 0.2);
  border-radius: 30px;
  box-sizing: border-box;
}

.nanny-card__info {
  flex: 1;
  min-width: 0;
}

.nanny-card__name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.nanny-label {
  margin: 3px 0 4px;
  color: #8a8a89;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 500;
}

.nanny-card__info h2 {
  margin: 0;
  color: #191a2a;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
}

/* INFO */

.nanny-card__info {
  flex: 1;
  min-width: 0;

  display: grid;
  grid-template-columns: 1fr auto auto auto;
  column-gap: 20px;
  align-items: center;
}

/* NANNY */

.nanny-card__info h2 {
  grid-column: 1;
  grid-row: 1;

  margin: 0;

  color: #191a2a;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
}

/* LOCATION / RATING / PRICE */

.nanny-card__info p {
  margin: 0;

  color: #191a2a;
  font-size: 16px;
  line-height: 1.4;
  white-space: nowrap;
}

.nanny-card__meta {
  position: absolute;
  top: 28px;
  right: 75px;

  display: flex;
  align-items: center;
  gap: 18px;

  color: #191a2a;
  font-size: 16px;
  white-space: nowrap;
}

.nanny-card__meta span {
  display: flex;
  align-items: center;
}

.nanny-card__meta strong {
  margin-left: 5px;
  color: #38c95b;
  font-weight: 600;
}

.meta-divider {
  width: 1px;
  height: 20px;
  background: #d9d9d9;
}


/* ===== FAVORITE ===== */

.favorite-button {
  position: absolute;
  top: 26px;
  right: 28px;

  width: 34px;
  height: 34px;
  padding: 0;

  border: 0;
  background: transparent;

  color: #191a2a;
  font-size: 34px;
  line-height: 1;

  cursor: pointer;
  transition: transform 0.2s ease;
}

.favorite-button:hover {
  transform: scale(1.08);
}

/* ===== DETAILS ===== */

.nanny-card__details {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  margin-top: 24px;
  padding-top: 0;
  border-top: none;
}

.nanny-card__details p {
  margin: 0;
  padding: 10px 18px;

  background: #f5f5f5;
  border-radius: 24px;

  color: #191a2a;
  font-size: 15px;
  line-height: 1.4;
}

.nanny-card__details strong {
  color: #909090;
  font-weight: 500;
}

/* ===== ABOUT ===== */

.nanny-card__about {
  margin: 24px 0 0;

  color: #8a8a8f;
  font-size: 16px;
  line-height: 1.5;
}

/* ===== CHARACTERS ===== */

.nanny-card__characters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  margin-top: 16px;
}

.nanny-card__characters span {
  padding: 9px 15px;

  border-radius: 22px;
  background: #f5f5f5;

  color: #55555d;
  font-size: 14px;
}

/* ===== REVIEWS ===== */

.nanny-card__reviews {
  margin-top: 18px;
}

.nanny-card__reviews p {
  margin: 0;

  color: #55555d;
  font-size: 14px;
}

/* ===== READ MORE ===== */

.read-more-button {
  margin-top: 18px;
  padding: 0;

  border: 0;
  background: transparent;

  color: #191a2a;
  font-size: 15px;
  font-weight: 500;

  text-decoration: underline;
  cursor: pointer;
}

.read-more-button:hover {
  color: #f03f3f;
}

/* ===== EXPANDED ===== */

.nanny-card > div[v-if] {
  margin-top: 24px;
  padding-top: 22px;

  border-top: 1px solid #eeeeee;
}

.nanny-card > div[v-if] > p {
  margin: 0 0 20px;

  color: #77777d;
  font-size: 15px;
  line-height: 1.5;
}

.nanny-card > div[v-if] h3 {
  margin: 0 0 16px;

  color: #191a2a;
  font-size: 20px;
}

.nanny-card > div[v-if] article {
  padding: 14px 0;

  border-top: 1px solid #eeeeee;
}

.nanny-card > div[v-if] article h4 {
  margin: 0 0 6px;

  color: #191a2a;
  font-size: 15px;
}

.nanny-card > div[v-if] article p {
  margin: 5px 0;

  color: #77777d;
  font-size: 14px;
  line-height: 1.5;
}

/* ===== APPOINTMENT ===== */

.appointment-button {
  margin-top: 24px;
  padding: 13px 25px;

  border: 0;
  border-radius: 12px;

  background: #f03f3f;
  color: #ffffff;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;
}

.appointment-button:hover {
  background: #d93636;
}

/* ===== TABLET ===== */

@media (max-width: 1000px) {
  .nanny-card__info {
    grid-template-columns: 1fr auto auto;
  }

  .nanny-card__info h2 {
    grid-column: 1 / -1;
    grid-row: 1;
  }

  .nanny-card__info p {
    grid-row: 2;
  }

  .nanny-card__info p:nth-of-type(3) {
    grid-column: 3;
  }
}

/* ===== MOBILE ===== */

@media (max-width: 700px) {
  .nanny-card {
    padding: 20px;
  }

  .nanny-card__top {
    gap: 18px;
    padding-right: 40px;
  }

  .nanny-card__avatar {
    width: 90px;
    height: 90px;
  }

  .nanny-card__info {
    display: block;
  }

  .nanny-card__info h2 {
    margin-bottom: 10px;
    font-size: 22px;
  }

  .nanny-card__info p {
    margin: 5px 0;
    white-space: normal;
  }

  .nanny-card__details {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .nanny-card {
    padding: 16px;
    border-radius: 18px;
  }

  .nanny-card__top {
    gap: 14px;
  }

  .nanny-card__avatar {
    width: 75px;
    height: 75px;
    padding: 8px;
    border-radius: 22px;
  }

  .nanny-card__info h2 {
    font-size: 19px;
  }

  .favorite-button {
    top: 18px;
    right: 16px;
    font-size: 28px;
  }
}
</style>
