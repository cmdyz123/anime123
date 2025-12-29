import { createRouter, createWebHistory } from 'vue-router'
import AnimeList from '../views/AnimeList.vue'
import AnimeDetails from '../views/AnimeDetails.vue'
import LoginView from '../views/LoginView.vue'
import RestrictedView from '../views/RestrictedView.vue'
import WatchStatus from '../views/WatchStatus.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/restricted',
    name: 'Restricted',
    component: RestrictedView
  },
  {
    path: '/watch-status',
    name: 'WatchStatus',
    component: WatchStatus,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'AnimeList',
    component: AnimeList,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/anime/2025.10',
    name: 'Anime202510',
    component: AnimeList,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/anime/2026.1',
    name: 'Anime20261',
    component: () => import('../views/Anime20261.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/anime/:month',
    name: 'AnimeMonth',
    component: () => import('../views/AnimeMonth.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/details/:id',
    name: 'AnimeDetails',
    component: AnimeDetails,
    meta: { requiresAuth: true }
  },
  {
    path: '/categories/:month',
    name: 'CategoryManager',
    component: () => import('../views/CategoryManager.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/editor',
    name: 'AnimeEditor',
    component: () => import('../views/AnimeEditor.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/month-editor/:month',
    name: 'MonthEditor',
    component: () => import('../components/MonthEditor.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const userRole = localStorage.getItem('userRole')

  // If accessing login page, always allow
  if (to.path === '/login') {
    next()
    return
  }

  // If accessing restricted page, always allow
  if (to.path === '/restricted') {
    next()
    return
  }

  // If route requires authentication
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      // Not authenticated, redirect to login
      next('/login')
    } else {
      // Check if route requires admin role
      if (to.meta.requiresAdmin && userRole !== 'admin') {
        // Regular user trying to access admin page, redirect to restricted
        next('/restricted')
      } else {
        // Allow access
        next()
      }
    }
  } else {
    // Public route, allow access
    next()
  }
})

export default router