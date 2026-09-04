<template>
  <section id="learning-map" ref="target" class="archive-section learning-section" :class="{ 'is-visible': visible }">
    <div v-if="codingAnimation" class="learning-section__animation" aria-hidden="true">
      <LottieAnimation
        :animation-data="codingAnimation"
        :decorative="true"
      />
    </div>

    <div class="section-heading">
      <SectionFolio number="04" label="LEARNING MAP" />
      <p class="section-heading__aside">三个方向 / 应用实践</p>
    </div>

    <div class="learning-section__intro">
      <h2>从共同基础出发，<br /><span>走向不同方向。</span></h2>
        <p>从共同基础出发，在持续学习、协作与项目实践中深入不同技术方向，逐步沉淀专业能力与属于自己的作品。</p>
    </div>

    <div class="direction-grid">
      <article v-for="direction in directions" :key="direction.number" class="direction-module">
        <div class="direction-module__top">
          <span class="direction-module__number">{{ direction.number }}</span>
          <span class="direction-module__status">方向简介</span>
        </div>
        <div class="direction-module__media">
          <JavaLogo v-if="direction.number === '01'" :size="280" :animated="true" />
          <GoLogo v-else-if="direction.number === '02'" :size="190" :animated="true" />
          <FrontendLogo v-else :size="280" :animated="true" />
        </div>
        <h3>{{ direction.label }}</h3>
        <p>{{ direction.name }} · {{ direction.description }}</p>
        <span class="direction-module__rule" aria-hidden="true"></span>
        <p class="direction-module__foot">确认方向 / {{ direction.name }}</p>
      </article>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import FrontendLogo from '../components/FrontendLogo.vue'
import GoLogo from '../components/GoLogo.vue'
import JavaLogo from '../components/JavaLogo.vue'
import LottieAnimation from '../components/LottieAnimation.vue'
import SectionFolio from '../components/SectionFolio.vue'
import { useInView } from '../composables/useInView'
import { directions } from '../data/siteContent'

export default defineComponent({
  name: 'LearningMap',
  components: { FrontendLogo, GoLogo, JavaLogo, LottieAnimation, SectionFolio },
  setup() {
    const { target, visible } = useInView()
    const codingAnimation = ref(null)

    watch(visible, async (isVisible) => {
      if (!isVisible || codingAnimation.value) return
      const module = await import('../assets/jansma-html-coding.json')
      codingAnimation.value = module.default || module
    })

    return { codingAnimation, directions, target, visible }
  }
})
</script>
