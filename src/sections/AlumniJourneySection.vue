<template>
  <section id="alumni-journey" ref="target" class="archive-section alumni-section" :class="{ 'is-visible': visible }">
    <div class="section-heading">
      <SectionFolio number="03" label="ALUMNI JOURNEY" />
      <p class="section-heading__aside">OUTCOMES / SELECTED RECORDS</p>
    </div>

    <div class="alumni-section__intro">
      <div>
        <p class="record-label">STA / DEPARTURE → DESTINATIONS</p>
        <h2>从这里出发，<br /><span>每一站都算数。</span></h2>
      </div>
      <div class="alumni-section__intro-copy">
        <p>校友旅程不是一串结果，而是一棵仍在生长的树。每一次入职、升学与实习，都从共同的根系向外展开。</p>
        <p class="alumni-section__as-of">{{ alumniJourneyMeta.label }} / {{ alumniJourneyMeta.englishLabel }}</p>
      </div>
    </div>

    <div class="journey-explorer">
      <JourneyTree3D :cohorts="alumniCohorts" />
      <JourneyLinearTree :cohorts="alumniCohorts" />
    </div>

    <p class="alumni-section__footnote">
      公开展示为部分校友去向；各年级计数后的“+”表示仍有记录未罗列，整棵树最后以一片省略叶收束。姓名已做默认脱敏，完整姓名、肖像与个人链接需在获得本人同意并完成核验后再公开。
    </p>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import SectionFolio from '../components/SectionFolio.vue'
import JourneyLinearTree from '../components/alumni/JourneyLinearTree.vue'
import JourneyTree3D from '../components/alumni/JourneyTreeSpatial.vue'
import { useInView } from '../composables/useInView'
import { alumniCohorts, alumniJourneyMeta } from '../data/alumni'

export default defineComponent({
  name: 'AlumniJourneySection',
  components: { JourneyLinearTree, JourneyTree3D, SectionFolio },
  setup() {
    const { target, visible } = useInView({ threshold: 0.04, rootMargin: '0px 0px -4% 0px' })
    return { alumniCohorts, alumniJourneyMeta, target, visible }
  }
})
</script>
