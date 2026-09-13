<template>
  <header class="site-nav" :class="{ 'is-open': menuOpen }">
    <button class="site-nav__brand" type="button" aria-label="返回主页" @click="goHome">
      <span class="site-nav__brand-mark">STA</span>
      <span class="site-nav__brand-copy">SOFTWARE AND TECHNOLOGY ASSOCIATION</span>
    </button>

    <button
      class="site-nav__menu-button"
      type="button"
      :aria-expanded="String(menuOpen)"
      aria-controls="site-navigation-actions"
      @click="menuOpen = !menuOpen"
    >
      <span>{{ menuOpen ? '关闭' : '菜单' }}</span>
      <span aria-hidden="true">{{ menuOpen ? '×' : '＋' }}</span>
    </button>

    <nav id="site-navigation-actions" class="site-nav__actions" aria-label="主导航">
      <button type="button" @click="goHome">主页</button>
      <button type="button" @click="goContact">联系我们</button>
      <button v-if="isLoggedIn" type="button" @click="goRecruitment">报名</button>
      <button v-if="!isLoggedIn" class="site-nav__primary" type="button" @click="goLogin">登录</button>
      <button v-else class="site-nav__quiet" type="button" @click="logout">退出登录</button>
    </nav>
  </header>
</template>

<script>
import { computed, defineComponent, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRecruitmentStore, useUserStore } from '@/stores'
import { useNotice } from '@/utils/notice'

export default defineComponent({
  name: 'SiteNavigation',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const userStore = useUserStore()
    const recruitmentStore = useRecruitmentStore()
    const { showNotice } = useNotice()
    const menuOpen = ref(false)
    const isLoggedIn = computed(() => userStore.isLoggedIn)

    const closeMenu = () => { menuOpen.value = false }
    const goHome = async () => {
      closeMenu()
      if (route.path === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
      else await router.push('/')
    }
    const goContact = async () => {
      closeMenu()
      const contact = document.getElementById('contact')
      if (route.path === '/' && contact) {
        contact.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      await router.push({ path: '/', hash: '#contact' })
    }
    const goRecruitment = async () => { closeMenu(); await router.push('/register') }
    const goLogin = async () => { closeMenu(); await router.push('/login') }
    const logout = async () => {
      closeMenu()
      userStore.clearSession()
      recruitmentStore.reset()
      await router.push('/')
      showNotice('退出登录成功', 'success')
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') closeMenu()
    }

    watch(menuOpen, (isOpen) => {
      document.body.classList.toggle('nav-open', isOpen)
    })
    watch(() => route.fullPath, closeMenu)
    window.addEventListener('keydown', handleEscape)
    onBeforeUnmount(() => {
      document.body.classList.remove('nav-open')
      window.removeEventListener('keydown', handleEscape)
    })

    return { menuOpen, isLoggedIn, goHome, goContact, goRecruitment, goLogin, logout }
  }
})
</script>
