import { createRouter, createWebHistory } from 'vue-router'

import { auth } from '../firebase/config'

import HomeView from '../views/HomeView.vue'
import NanniesView from '../views/NanniesView.vue'
import FavoritesView from '../views/FavoritesView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/nannies',
      name: 'nannies',
      component: NanniesView,
    },

    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !auth.currentUser) {
    return '/'
  }
})

export default router
