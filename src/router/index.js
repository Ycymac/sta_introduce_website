import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    { path: '/login', name: 'account', component: () => import('@/views/AccountView.vue') },
    { path: '/register', name: 'recruitment', component: () => import('@/views/RecruitmentView.vue'), meta: { requiresAuth: true } },
    { path: '/registerTable', name: 'application', component: () => import('@/views/ApplicationFormView.vue'), meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !useUserStore().authorization) return '/'
})

export default router
