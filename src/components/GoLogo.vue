<template>
  <div
    ref="target"
    :class="[
      'tech-logo',
      'go-logo',
      { 'tech-logo--active': visible && animated && autoplay }
    ]"
    :style="{
      '--tech-duration': `${duration}ms`,
      '--go-label-delay': `${duration * 0.72}ms`,
      '--go-size': normalizedSize
    }"
    :role="decorative ? undefined : 'img'"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-labelledby="decorative ? undefined : `${idBase}-title ${idBase}-desc`"
  >
    <span v-if="!decorative" :id="`${idBase}-title`" class="sr-only">Go Gopher direction mark</span>
    <span v-if="!decorative" :id="`${idBase}-desc`" class="sr-only">
      The standard Go Gopher vector appears once from bottom to top and remains static.
    </span>

    <div class="go-logo__reveal" aria-hidden="true">
      <img
        class="go-logo__gopher"
        :src="gopherUrl"
        alt=""
        width="402"
        height="559"
      />
      <span class="go-logo__scan"></span>
    </div>
    <span class="go-logo__label" aria-hidden="true">Go</span>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import gopherUrl from '../assets/gopher.original.svg'
import { useInView } from '../composables/useInView'

let logoCount = 0

export default defineComponent({
  name: 'GoLogo',
  props: {
    size: { type: [Number, String], default: 190 },
    animated: { type: Boolean, default: true },
    autoplay: { type: Boolean, default: true },
    duration: { type: Number, default: 2400 },
    decorative: { type: Boolean, default: false }
  },
  setup(props) {
    logoCount += 1
    const { target, visible } = useInView({ threshold: 0.4, rootMargin: '0px 0px -6% 0px' })
    const normalizedSize = computed(() => typeof props.size === 'number' ? `${props.size}px` : props.size)
    return {
      gopherUrl,
      idBase: `go-logo-${logoCount}`,
      normalizedSize,
      target,
      visible
    }
  }
})
</script>

<style scoped>
.go-logo {
  --tech-duration: 2400ms;
  --go-size: 190px;
  display: grid;
  width: min(100%, var(--go-size));
  justify-items: center;
  gap: 8px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.go-logo__reveal {
  position: relative;
  width: min(100%, 142px);
  aspect-ratio: 401.98 / 559.472;
  overflow: hidden;
}

.go-logo__gopher {
  display: block;
  width: 100%;
  height: auto;
  clip-path: inset(0);
}

.go-logo__scan {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: var(--accent);
  opacity: 0;
}

.go-logo__label {
  color: #00add8;
  font-family: var(--modern-display);
  font-size: 25px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
}

.tech-logo--active .go-logo__gopher {
  animation: go-gopher-reveal var(--tech-duration) cubic-bezier(0.22, 1, 0.36, 1) both;
}

.tech-logo--active .go-logo__scan {
  animation: go-gopher-scan var(--tech-duration) cubic-bezier(0.22, 1, 0.36, 1) both;
}

.tech-logo--active .go-logo__label {
  animation: go-label-in 360ms ease-out var(--go-label-delay) both;
}

@keyframes go-gopher-reveal {
  0% { clip-path: inset(100% 0 0); opacity: 0.75; }
  88%, 100% { clip-path: inset(0); opacity: 1; }
}

@keyframes go-gopher-scan {
  0% { bottom: 0; opacity: 0; }
  10% { opacity: 0.55; }
  88% { bottom: calc(100% - 1px); opacity: 0.4; }
  100% { bottom: calc(100% - 1px); opacity: 0; }
}

@keyframes go-label-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .tech-logo--active .go-logo__gopher,
  .tech-logo--active .go-logo__scan,
  .tech-logo--active .go-logo__label {
    animation: none !important;
    clip-path: inset(0);
    opacity: 1;
    transform: none;
  }

  .tech-logo--active .go-logo__scan {
    opacity: 0;
  }
}
</style>
