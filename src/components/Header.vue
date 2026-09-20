<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import Modal from '../components/Modal.vue'
import AuthForm from '../components/AuthForm.vue'
import { useAuthStore } from '../stores/auth.js'

const route = useRoute()

const isHomePage = computed(() => route.path === '/')

const authStore = useAuthStore()

const isAuthModalOpen = ref(false)
const authMode = ref('login')

const isAuthenticated = computed(() => !!authStore.user)

const openAuth = (mode) => {
  authMode.value = mode
  isAuthModalOpen.value = true
}

const closeAuth = () => {
  isAuthModalOpen.value = false
}

const handleSuccess = () => {
  closeAuth()
}

const logout = async () => {
  await authStore.logout()
}
</script>

<template>
<header :class="{ 'header--home': isHomePage }">
    <nav>
  <div class="logo">
    Nannies.Service
  </div>
      <RouterLink to="/">
        Home
      </RouterLink>

      <RouterLink to="/nannies">
        Nannies
      </RouterLink>

      <RouterLink
        v-if="isAuthenticated"
        to="/favorites"
      >
        Favorites
      </RouterLink>

      <template v-if="!isAuthenticated">
        <button
          type="button"
          @click="openAuth('login')"
        >
          Log In
        </button>

        <button
          type="button"
          @click="openAuth('register')"
        >
          Registration
        </button>
      </template>
<template v-else>
<span class="user-email">
  {{ authStore.user.displayName || authStore.user.email.split('@')[0] }}
</span>

  <button
    type="button"
    @click="logout"
  >
    Log Out
  </button>
</template>
    </nav>
  </header>

  <Modal
    :is-open="isAuthModalOpen"
    @close="closeAuth"
  >
    <AuthForm
      :mode="authMode"
      @success="handleSuccess"
    />
  </Modal>
</template>

<style scoped>
.logo {
  margin-right: auto;

  font-size: 24px;
  font-weight: 500;

  text-decoration: none;

  letter-spacing: -0.02em;
  color: #fbfbfb;
}
header {
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 100;

  width: 100%;
  height: 62px;

  transform: translateX(-50%);

  box-sizing: border-box;

  background: #ff3b3b;

  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
}

.header--home {
  width: min(1184px, calc(100% - 48px));
  background: transparent;
}

nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  height: 100%;
  padding: 0 68px;

  gap: 14px;
  box-sizing: border-box;
}

nav a {
  position: relative;

  color: #ffffff;
  font-size: 12px;
  text-decoration: none;
}

nav a.router-link-exact-active::after {
  content: '';

  position: absolute;
  left: 50%;
  bottom: -8px;

  width: 4px;
  height: 4px;

  border-radius: 50%;
  background: #ffffff;

  transform: translateX(-50%);
}

nav button {
  height: 35px;
  padding: 0 28px;

  border-radius: 22px;

  font-size: 12px;
  cursor: pointer;
}

nav button:first-of-type {
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: transparent;
  color: #ffffff;
}

nav button:last-of-type {
  border: 1px solid #ff3b3b;
  background: #ff3b3b;
  color: #ffffff;
}
.user-email {
  margin-left: 20px;
}
</style>
