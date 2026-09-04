<template>
  <div
    ref="container"
    class="lottie-animation"
    :class="{ 'lottie-animation--decorative': decorative }"
    :role="decorative ? undefined : 'img'"
    :aria-label="decorative ? undefined : ariaLabel"
    :aria-hidden="decorative ? 'true' : undefined"
  ></div>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import lottie from 'lottie-web/build/player/lottie_light'
import { useReducedMotion } from '../composables/useReducedMotion'

export default defineComponent({
  name: 'LottieAnimation',
  emits: ['complete', 'ready'],
  props: {
    animationData: { type: Object, required: true },
    ariaLabel: { type: String, default: '' },
    autoplay: { type: Boolean, default: true },
    decorative: { type: Boolean, default: false },
    endFrame: { type: Number, default: null },
    loop: { type: [Boolean, Number], default: false },
    renderer: { type: String, default: 'svg' }
  },
  setup(props, { emit }) {
    const container = ref(null)
    const { reducedMotion } = useReducedMotion()
    let animation

    const showStaticEndState = () => {
      if (!animation) return
      const frame = props.endFrame === null
        ? Math.max(animation.totalFrames - 1, 0)
        : Math.max(props.endFrame, 0)
      animation.goToAndStop(frame, true)
    }

    onMounted(() => {
      animation = lottie.loadAnimation({
        container: container.value,
        renderer: props.renderer,
        loop: reducedMotion.value ? false : props.loop,
        autoplay: false,
        animationData: props.animationData,
        rendererSettings: {
          progressiveLoad: true,
          preserveAspectRatio: 'xMidYMid meet'
        }
      })

      animation.addEventListener('DOMLoaded', () => {
        emit('ready')
        if (reducedMotion.value) {
          showStaticEndState()
          emit('complete')
        } else if (props.autoplay) {
          if (props.endFrame === null) {
            animation.play()
          } else {
            animation.playSegments([0, props.endFrame], true)
          }
        }
      })

      animation.addEventListener('complete', () => {
        showStaticEndState()
        emit('complete')
      })

      if (reducedMotion.value) showStaticEndState()
    })

    onBeforeUnmount(() => {
      if (animation) {
        animation.destroy()
        animation = undefined
      }
    })

    return { container }
  }
})
</script>

<style scoped>
.lottie-animation {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.lottie-animation :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
