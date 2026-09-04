<template>
  <div class="site-root" :data-theme="theme">
    <a class="skip-link" href="#who-we-are">跳到主要内容</a>

    <div class="ambient-layer" aria-hidden="true">
      <div class="ambient-layer__grid"></div>
      <div class="ambient-layer__mark">
        <StaLogo variant="ambient" :size="720" :decorative="true" />
      </div>
    </div>

    <WelcomeStage @advance="scrollToIntroduction" />

    <main id="main-content" class="page-sheet">
      <div class="page-sheet__masthead">
        <p class="page-sheet__masthead-label">STA / DIGITAL ARCHIVE</p>
        <p class="page-sheet__masthead-date">2010.04—NOW</p>
      </div>

      <IdentitySection />
      <OriginTimeline />
      <AlumniJourneySection />
      <LearningMap />
      <GrowthPath />
      <SiteFooter />
    </main>

    <div class="utility-dock" aria-label="页面设置">
      <ThemeToggle :theme="theme" @toggle="toggleTheme" />
      <a class="utility-dock__top" href="#welcome" aria-label="回到欢迎页" title="回到欢迎页">↑</a>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import IdentitySection from './sections/IdentitySection.vue'
import LearningMap from './sections/LearningMap.vue'
import AlumniJourneySection from './sections/AlumniJourneySection.vue'
import OriginTimeline from './sections/OriginTimeline.vue'
import GrowthPath from './sections/GrowthPath.vue'
import SiteFooter from './components/SiteFooter.vue'
import StaLogo from './components/StaLogo.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import WelcomeStage from './components/WelcomeStage.vue'

export default defineComponent({
  name: 'App',
  components: {
    GrowthPath,
    IdentitySection,
    LearningMap,
    AlumniJourneySection,
    OriginTimeline,
    SiteFooter,
    StaLogo,
    ThemeToggle,
    WelcomeStage
  },
  setup() {
    const theme = ref('dark')

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

    const scrollToIntroduction = () => {
      const introduction = document.getElementById('who-we-are')
      if (introduction) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        introduction.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
      }
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

    return { theme, toggleTheme, scrollToIntroduction }
  }
})
</script>
