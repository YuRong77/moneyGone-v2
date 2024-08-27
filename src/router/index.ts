import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Login from '@/views/Login/Index.vue'

export const router = createRouter({
  history: createWebHashHistory(),
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
      name: 'Home',
      meta: { requiresAuth: true },
      component: MainLayout,
      children: [
        { path: 'lobby', name: 'Lobby', component: () => import('@/views/Lobby/Index.vue') },
        { path: 'record', name: 'Record', component: () => import('@/views/Record/Index.vue') },
        { path: 'chart', name: 'Chart', component: () => import('@/views/Chart/Index.vue') },
        { path: 'setting', name: 'Setting', component: () => import('@/views/Setting/Index.vue') }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
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
