<template>
  <section
    id="welcome"
    class="welcome-stage"
    :class="{
      'welcome-stage--complete': revealComplete,
      'welcome-stage--hello-complete': helloComplete
    }"
    tabindex="-1"
    aria-labelledby="welcome-title"
    @wheel="handleWheel"
    @keydown="handleKeydown"
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
  >
    <div class="welcome-stage__grid" aria-hidden="true"></div>
    <div class="welcome-stage__content">
      <div class="welcome-stage__topline">
        <p class="welcome-stage__folio">00 / WELCOME</p>
        <p class="welcome-stage__status"><span class="status-dot"></span> DIGITAL ARCHIVE</p>
      </div>

      <div class="welcome-stage__composition">
        <div class="welcome-stage__copy">
          <div class="welcome-stage__hello">
            <LottieAnimation
              :animation-data="helloAnimation"
              :end-frame="498"
              aria-label="hello"
              class="welcome-stage__lottie"
              @complete="handleHelloComplete"
            />
          </div>
          <div class="welcome-stage__identity">
            <h1 id="welcome-title" class="welcome-stage__title">{{ displayText }}<span class="type-cursor" aria-hidden="true"></span></h1>
            <p class="welcome-stage__subtitle">软件科技协会 <span aria-hidden="true">·</span> Software and Technology Association</p>
          </div>
        </div>

        <div class="welcome-stage__logo-wrap">
          <StaLogo variant="ambient" :size="350" :animated="true" :duration="2800" />
          <p class="welcome-stage__logo-note">ASSOCIATION MARK / EST. 2010</p>
        </div>
      </div>

      <div class="welcome-stage__bottomline">
        <p class="welcome-stage__hint">SCROLL TO ENTER <span aria-hidden="true">↓</span></p>
        <p class="welcome-stage__location">XI'AN · CHINA <span aria-hidden="true">/</span> 2010—NOW</p>
      </div>
    </div>

    <button class="welcome-stage__advance" type="button" @click="advance">
      <span class="welcome-stage__advance-icon" aria-hidden="true">↓</span>
      <span>进入年鉴</span>
    </button>
  </section>
</template>

<script>
import { defineComponent, onBeforeUnmount, ref, watch } from 'vue'
import { useReducedMotion } from '../composables/useReducedMotion'
import { useTypewriter } from '../composables/useTypewriter'
import helloAnimation from '../assets/hello-apple.json'
import LottieAnimation from './LottieAnimation.vue'
import StaLogo from './StaLogo.vue'

export default defineComponent({
  name: 'WelcomeStage',
  components: { LottieAnimation, StaLogo },
  emits: ['advance', 'complete'],
  setup(_, { emit }) {
    const { reducedMotion } = useReducedMotion()
    const helloComplete = ref(false)
    const { displayText, complete, start: startTypewriter } = useTypewriter('WE ARE STA_<', {
      autoStart: false,
      delay: 0,
      speed: 78,
      reducedMotion
    })
    const revealComplete = ref(false)
    const touchStartY = ref(0)
    let completionTimeout

    const markComplete = () => {
      if (revealComplete.value) return
      revealComplete.value = true
      emit('complete')
    }

    const advance = () => {
      emit('advance')
    }

    const handleHelloComplete = () => {
      if (helloComplete.value) return
      helloComplete.value = true
      startTypewriter()
    }

    const handleWheel = (event) => {
      if (event.deltaY > 16) {
        event.preventDefault()
        advance()
      }
    }

    const handleKeydown = (event) => {
      if (['ArrowDown', 'PageDown', 'Enter', ' '].includes(event.key)) {
        event.preventDefault()
        advance()
      }
    }

    const handleTouchStart = (event) => {
      touchStartY.value = event.changedTouches[0].clientY
    }

    const handleTouchEnd = (event) => {
      const distance = touchStartY.value - event.changedTouches[0].clientY
      if (distance > 32) advance()
    }

    watch(complete, (isComplete) => {
      if (!isComplete) return
      if (reducedMotion.value) {
        markComplete()
        return
      }
      completionTimeout = window.setTimeout(markComplete, 500)
    }, { immediate: true })

    watch(reducedMotion, (isReduced) => {
      if (isReduced) markComplete()
    })

    onBeforeUnmount(() => {
      if (completionTimeout) window.clearTimeout(completionTimeout)
    })

    return {
      displayText,
      helloAnimation,
      helloComplete,
      revealComplete,
      advance,
      handleHelloComplete,
      handleKeydown,
      handleTouchEnd,
      handleTouchStart,
      handleWheel
    }
  }
})
</script>
