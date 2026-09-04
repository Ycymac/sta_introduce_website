<template>
  <svg
    ref="target"
    :class="[
      'tech-logo',
      'frontend-logo',
      { 'tech-logo--active': visible && animated && autoplay }
    ]"
    :style="{ '--tech-duration': `${duration}ms` }"
    viewBox="0 0 640 360"
    :width="size"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    :role="decorative ? undefined : 'img'"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-labelledby="decorative ? undefined : `${idBase}-title ${idBase}-desc`"
  >
    <title v-if="!decorative" :id="`${idBase}-title`">Frontend direction mark</title>
    <desc v-if="!decorative" :id="`${idBase}-desc`">
      Frontend mark combining recognizable HTML5 and CSS3 shields in orange and blue.
    </desc>

    <g :id="`${idBase}-title-group`" class="frontend-logo__title">
      <text x="320" y="48" text-anchor="middle">FRONTEND</text>
    </g>

    <g :id="`${idBase}-html-shield`" class="frontend-logo__shield frontend-logo__shield--html">
      <path :id="`${idBase}-html-outer`" class="frontend-logo__shield-outline" d="M105 77H255L239 274L180 307L121 274Z" />
      <path :id="`${idBase}-html-inner`" class="frontend-logo__shield-inner" d="M180 92L244 92L231 263L180 291Z" />
      <path :id="`${idBase}-html-number-five`" class="frontend-logo__number" d="M146 125H214V143H164L162 164C176 157 207 158 218 179C230 203 214 231 183 233C160 235 142 224 135 206L153 198C159 210 170 216 184 215C198 214 204 207 204 197C204 187 195 181 181 181C169 181 159 185 153 191L136 185Z" />
      <text class="frontend-logo__micro-label" x="180" y="260" text-anchor="middle">HTML5</text>
    </g>

    <g :id="`${idBase}-css-shield`" class="frontend-logo__shield frontend-logo__shield--css">
      <path :id="`${idBase}-css-outer`" class="frontend-logo__shield-outline" d="M385 77H535L519 274L460 307L401 274Z" />
      <path :id="`${idBase}-css-inner`" class="frontend-logo__shield-inner" d="M460 92L524 92L511 263L460 291Z" />
      <path :id="`${idBase}-css-number-three`" class="frontend-logo__number" d="M426 126H496V145L479 160C493 163 503 175 503 193C503 217 484 232 459 232C440 232 423 222 416 207L432 197C438 208 447 214 459 214C472 214 481 207 481 197C481 186 473 180 458 180H448V163L470 144H426Z" />
      <text class="frontend-logo__micro-label" x="460" y="260" text-anchor="middle">CSS3</text>
    </g>

    <g :id="`${idBase}-base-line`" class="frontend-logo__base-line">
      <path d="M90 329H550" />
      <circle cx="90" cy="329" r="4" />
      <circle cx="550" cy="329" r="4" />
    </g>
  </svg>
</template>

<script>
import { defineComponent } from 'vue'
import { useInView } from '../composables/useInView'

let logoCount = 0

export default defineComponent({
  name: 'FrontendLogo',
  props: {
    size: { type: [Number, String], default: 280 },
    animated: { type: Boolean, default: true },
    autoplay: { type: Boolean, default: true },
    duration: { type: Number, default: 2600 },
    decorative: { type: Boolean, default: false }
  },
  setup() {
    logoCount += 1
    const { target, visible } = useInView({ threshold: 0.24, rootMargin: '0px 0px -6% 0px' })
    return { idBase: `frontend-logo-${logoCount}`, target, visible }
  }
})
</script>

<style scoped>
.frontend-logo {
  --html-orange: #e44d26;
  --html-orange-dark: #f16529;
  --css-blue: #264de4;
  --css-blue-dark: #2965f1;
  --frontend-light: #ebebeb;
  --frontend-ink: var(--ink);
  --frontend-line: #d1d5db;
  display: block;
  width: min(100%, 280px);
  height: auto;
  overflow: visible;
}

.frontend-logo__title text {
  fill: var(--frontend-ink);
  font-family: var(--display);
  font-size: 19px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.frontend-logo__shield-outline {
  fill: var(--html-orange);
  stroke: var(--html-orange);
  stroke-linejoin: round;
  stroke-width: 6;
}

.frontend-logo__shield-inner {
  fill: var(--html-orange-dark);
}

.frontend-logo__shield--css .frontend-logo__shield-outline {
  fill: var(--css-blue);
  stroke: var(--css-blue);
}

.frontend-logo__shield--css .frontend-logo__shield-inner {
  fill: var(--css-blue-dark);
}

.frontend-logo__number {
  fill: var(--frontend-light);
}

.frontend-logo__micro-label {
  fill: var(--frontend-light);
  font-family: var(--display);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.frontend-logo__base-line path {
  fill: none;
  stroke: var(--frontend-line);
  stroke-width: 2;
}

.frontend-logo__base-line circle {
  fill: var(--frontend-line);
}

.tech-logo--active .frontend-logo__title {
  animation: frontend-title-in 380ms ease-out both;
}

.tech-logo--active .frontend-logo__shield--html .frontend-logo__shield-outline {
  stroke-dasharray: 700;
  stroke-dashoffset: 700;
  animation: frontend-shield-draw 680ms ease-out 300ms forwards;
}

.tech-logo--active .frontend-logo__shield--html .frontend-logo__shield-inner,
.tech-logo--active .frontend-logo__shield--html .frontend-logo__number,
.tech-logo--active .frontend-logo__shield--html .frontend-logo__micro-label {
  animation: frontend-fill-rise 470ms ease-out 720ms both;
}

.tech-logo--active .frontend-logo__shield--css .frontend-logo__shield-outline {
  stroke-dasharray: 700;
  stroke-dashoffset: 700;
  animation: frontend-shield-draw 680ms ease-out 960ms forwards;
}

.tech-logo--active .frontend-logo__shield--css .frontend-logo__shield-inner,
.tech-logo--active .frontend-logo__shield--css .frontend-logo__number,
.tech-logo--active .frontend-logo__shield--css .frontend-logo__micro-label {
  animation: frontend-fill-rise 470ms ease-out 1380ms both;
}

.tech-logo--active .frontend-logo__base-line {
  animation: frontend-lock-in 380ms ease-out 1880ms both;
}

@keyframes frontend-title-in {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes frontend-shield-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes frontend-fill-rise {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes frontend-lock-in {
  from { opacity: 0; transform: scaleX(0.86); }
  to { opacity: 1; transform: scaleX(1); }
}

@media (prefers-reduced-motion: reduce) {
  .tech-logo--active * {
    animation: none !important;
    transition: none !important;
  }

  .tech-logo--active .frontend-logo__shield-outline {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
  }
}
</style>
