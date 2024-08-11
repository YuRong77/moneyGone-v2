import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'Lobby' }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'Lobby' }
    },
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        { path: 'lobby', name: 'Lobby', component: () => import('@/views/Home/Lobby.vue') },
        { path: 'record', name: 'Record', component: () => import('@/views/Home/Record.vue') },
        { path: 'chart', name: 'Chart', component: () => import('@/views/Home/Chart.vue') },
        { path: 'setting', name: 'Setting', component: () => import('@/views/Home/Setting.vue') }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/Login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
