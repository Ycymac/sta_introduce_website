<template>
  <div class="site-root" :data-theme="theme">
    <div class="ambient-layer" aria-hidden="true">
      <div class="ambient-layer__grid"></div>
      <div class="ambient-layer__mark">
        <StaLogo variant="ambient" :size="720" :decorative="true" />
      </div>
    </div>
    <SiteNavigation />
    <router-view v-slot="{ Component }">
      <transition name="route-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <InlineNotice />

    <div class="utility-dock" aria-label="页面设置">
      <ThemeToggle :theme="theme" @toggle="toggleTheme" />
      <button class="utility-dock__top" type="button" aria-label="回到页面顶部" title="回到页面顶部" @click="goTop">↑</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InlineNotice from './components/InlineNotice.vue'
import SiteNavigation from './components/SiteNavigation.vue'
import StaLogo from './components/StaLogo.vue'
import ThemeToggle from './components/ThemeToggle.vue'

export default defineComponent({
  name: 'App',
  components: {
    InlineNotice,
    SiteNavigation,
    StaLogo,
    ThemeToggle
  },
  setup() {
    const theme = ref('dark')
    const route = useRoute()
    const router = useRouter()

    const setTheme = (nextTheme) => {
      theme.value = nextTheme
      document.documentElement.dataset.theme = nextTheme
      document.documentElement.style.colorScheme = nextTheme
      const themeColor = document.querySelector('meta[name="theme-color"]')
      if (themeColor) themeColor.setAttribute('content', nextTheme === 'dark' ? '#0a0a0b' : '#fafaf8')
      try {
        window.localStorage.setItem('sta-theme', nextTheme)
      } catch (error) {
        // A blocked storage context should not prevent theme switching.
      }
    }

    const toggleTheme = () => {
      setTheme(theme.value === 'dark' ? 'light' : 'dark')
    }

    const goTop = async () => {
      if (route.path !== '/') await router.push('/')
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    }

    onMounted(() => {
      try {
        const savedTheme = window.localStorage.getItem('sta-theme')
        setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : theme.value)
      } catch (error) {
        // Private browsing and embedded contexts may deny localStorage access.
        setTheme(theme.value)
      }
    })

    return { theme, toggleTheme, goTop }
  }
})
</script>
