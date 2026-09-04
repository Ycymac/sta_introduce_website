<template>
  <article
    ref="target"
    class="journey-record"
    :class="{ 'is-visible': visible }"
    :aria-label="`${person.publicName}：${routeText}`"
  >
    <div class="journey-record__identity">
      <span class="journey-record__serial">{{ serial }}</span>
      <h4>{{ person.publicName }}</h4>
    </div>

    <ol class="journey-record__stops" aria-label="行程节点">
      <li
        v-for="(stop, stopIndex) in person.stops"
        :key="`${person.id}-${stopIndex}-${stop.organization}`"
        class="journey-stop"
        :class="`journey-stop--${stop.type}`"
        :style="{ '--stop-delay': `${stopIndex * 95}ms` }"
      >
        <span class="journey-stop__node" aria-hidden="true"></span>
        <span class="journey-stop__copy">
          <img
            v-if="stopAsset(stop)"
            class="journey-stop__image"
            :src="stopAsset(stop)"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <strong>{{ stop.organization }}</strong>
          <small>{{ stop.label }}</small>
        </span>
      </li>
    </ol>

    <div class="journey-record__terminal">
      <img
        v-if="terminalAsset"
        class="journey-record__terminal-image"
        :src="terminalAsset"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <span class="journey-record__terminal-label">DESTINATION</span>
      <strong>{{ terminal.organization }}</strong>
      <small>{{ terminal.label }}</small>
    </div>
  </article>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useInView } from '../../composables/useInView'
import antAsset from '../../assets/alumni-icons/ant.png'
import bilibiliAsset from '../../assets/alumni-icons/bilibili.png'
import bytedanceAsset from '../../assets/alumni-icons/bytedance.png'
import didiAsset from '../../assets/alumni-icons/didi.png'
import dingtalkAsset from '../../assets/alumni-icons/dingtalk.png'
import meituanAsset from '../../assets/alumni-icons/meituan.png'
import tencentAsset from '../../assets/alumni-icons/tencent.png'
import xiaohongshuAsset from '../../assets/alumni-icons/xiaohongshu.png'

const assetRegistry = {
  ant: antAsset,
  bilibili: bilibiliAsset,
  bytedance: bytedanceAsset,
  didi: didiAsset,
  dingtalk: dingtalkAsset,
  meituan: meituanAsset,
  tencent: tencentAsset,
  xiaohongshu: xiaohongshuAsset
}

export default defineComponent({
  name: 'JourneyRecord',
  props: {
    person: { type: Object, required: true },
    serial: { type: String, default: '01' }
  },
  setup(props) {
    const { target, visible } = useInView({ threshold: 0.2, rootMargin: '0px 0px -10% 0px' })
    const terminal = computed(() => props.person.stops[props.person.stops.length - 1])
    const routeText = computed(() => props.person.stops.map((stop) => `${stop.organization} / ${stop.label}`).join(' -> '))
    const terminalAsset = computed(() => assetRegistry[terminal.value.asset] || '')
    const stopAsset = (stopItem) => assetRegistry[stopItem.asset] || ''

    return { target, visible, terminal, terminalAsset, routeText, stopAsset }
  }
})
</script>
