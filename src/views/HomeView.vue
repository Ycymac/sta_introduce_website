<template>
  <div class="home-view">
    <a class="skip-link" href="#who-we-are">跳到主要内容</a>
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
      <ContactSection />
      <SiteFooter />
    </main>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import IdentitySection from '@/sections/IdentitySection.vue'
import LearningMap from '@/sections/LearningMap.vue'
import AlumniJourneySection from '@/sections/AlumniJourneySection.vue'
import OriginTimeline from '@/sections/OriginTimeline.vue'
import GrowthPath from '@/sections/GrowthPath.vue'
import ContactSection from '@/components/ContactSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import WelcomeStage from '@/components/WelcomeStage.vue'

export default defineComponent({
  name: 'HomeView',
  components: { GrowthPath, IdentitySection, LearningMap, AlumniJourneySection, OriginTimeline, ContactSection, SiteFooter, WelcomeStage },
  setup() {
    const scrollToIntroduction = () => {
      const introduction = document.getElementById('who-we-are')
      if (!introduction) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      introduction.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    }
    return { scrollToIntroduction }
  }
})
</script>
