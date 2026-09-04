<template>
  <section id="our-origin" ref="target" class="archive-section origin-section" :class="{ 'is-visible': visible }">
    <div class="section-heading">
      <SectionFolio number="02" label="OUR ORIGIN" />
      <p class="section-heading__aside">A LIVING RECORD / 02 STORY NODES</p>
    </div>

    <div class="origin-section__intro">
      <h2>从一个日期开始，<br /><span>向未来展开。</span></h2>
      <p>从 2010 年 4 月启程，软协的故事由一届又一届成员共同书写。</p>
    </div>

    <ol class="origin-timeline" aria-label="软件科技协会历史节点">
      <li v-for="event in history" :key="event.id" class="origin-timeline__item">
        <div class="origin-timeline__date">{{ event.date }}</div>
        <div class="origin-timeline__node" aria-hidden="true"></div>
        <article class="origin-timeline__record">
          <p class="record-label">{{ event.label }}</p>
          <h3>{{ event.title }}</h3>
          <p>{{ event.body }}</p>
        </article>
      </li>
    </ol>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import SectionFolio from '../components/SectionFolio.vue'
import { useInView } from '../composables/useInView'
import { history } from '../data/history'

export default defineComponent({
  name: 'OriginTimeline',
  components: { SectionFolio },
  setup() {
    const { target, visible } = useInView()
    return { history, target, visible }
  }
})
</script>
