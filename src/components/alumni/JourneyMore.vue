<template>
  <article
    ref="target"
    class="journey-record journey-record--more"
    :class="{ 'is-visible': visible }"
    aria-label="更多校友旅程"
  >
    <div class="journey-record__identity">
      <span class="journey-record__serial">……</span>
      <h4>更多校友</h4>
    </div>

    <div class="journey-record__more-copy">
      <span class="journey-record__more-label">STILL IN THE MAKING</span>
      <strong>正在被努力书写</strong>
      <small>下一站，继续发生</small>
    </div>
  </article>
</template>

<script>
import { defineComponent } from 'vue'
import { useInView } from '../../composables/useInView'

export default defineComponent({
  name: 'JourneyMore',
  setup() {
    const { target, visible } = useInView({ threshold: 0.2, rootMargin: '0px 0px -10% 0px' })
    return { target, visible }
  }
})
</script>
