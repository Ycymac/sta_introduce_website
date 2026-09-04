<template>
  <section id="growth-path" ref="target" class="archive-section growth-section" :class="{ 'is-visible': visible }">
    <div class="section-heading">
      <SectionFolio number="05" label="GROWTH PATH" />
      <p class="section-heading__aside">YEAR ONE / FOUNDATION TO PRACTICE</p>
    </div>

    <div class="growth-section__intro">
      <h2>先建立共同语言，<br /><span>再选择要走的路。</span></h2>
      <p>第一学年的路线强调连续投入：基础、选择、练习，逐段留下成长证据。</p>
    </div>

    <div class="growth-roadmap">
      <article v-for="stage in growthPath" :key="stage.term" class="growth-stage">
        <div class="growth-stage__heading">
          <div>
            <p class="growth-stage__term">{{ stage.term }}</p>
            <h3>{{ stage.english }}</h3>
          </div>
          <span class="growth-stage__marker" aria-hidden="true">→</span>
        </div>
        <p class="growth-stage__summary">{{ stage.summary }}</p>
        <ol class="growth-stage__steps">
          <li v-for="(step, index) in stage.steps" :key="step.label" :class="{ 'step--emphasis': step.emphasis }">
            <span class="step-index">0{{ index + 1 }}</span>
            <span>{{ step.label }}</span>
          </li>
        </ol>
      </article>
    </div>

    <aside class="selection-panel" aria-labelledby="selection-title">
      <div class="selection-panel__seal" aria-hidden="true">STA<br /><span>标准</span></div>
      <div class="selection-panel__copy">
        <p class="record-label">SELECTION / STANDARDS</p>
        <h3 id="selection-title">{{ selectionCopy.lead }}</h3>
        <p>{{ selectionCopy.body }}</p>
        <p>{{ selectionCopy.close }}</p>
      </div>
    </aside>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import SectionFolio from '../components/SectionFolio.vue'
import { useInView } from '../composables/useInView'
import { growthPath, selectionCopy } from '../data/siteContent'

export default defineComponent({
  name: 'GrowthPath',
  components: { SectionFolio },
  setup() {
    const { target, visible } = useInView()
    return { growthPath, selectionCopy, target, visible }
  }
})
</script>
