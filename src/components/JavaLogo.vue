<template>
  <svg
    ref="target"
    :class="[
      'tech-logo',
      'java-logo',
      { 'tech-logo--active': visible && animated && autoplay }
    ]"
    :style="{ '--tech-duration': `${duration}ms` }"
    viewBox="0 0 720 240"
    :width="size"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    :role="decorative ? undefined : 'img'"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-labelledby="decorative ? undefined : `${idBase}-title ${idBase}-desc`"
  >
    <title v-if="!decorative" :id="`${idBase}-title`">Java direction mark</title>
    <desc v-if="!decorative" :id="`${idBase}-desc`">
      JAVA wordmark with a Java coffee cup replacing the V, including three orange-red steam lines.
    </desc>

    <g :id="`${idBase}-defs`" aria-hidden="true"></g>
    <g :id="`${idBase}-text-left`" class="java-logo__text-left" fill="var(--java-dark)">
      <path
        :id="`${idBase}-j`"
        class="java-logo__letter"
        fill-rule="evenodd"
        d="M56 42H119V151C119 176 107 190 84 190C61 190 49 176 49 152V134H78V151C78 162 81 167 89 167C96 167 99 162 99 151V69H56Z"
      />
      <path
        :id="`${idBase}-a-left`"
        class="java-logo__letter"
        fill-rule="evenodd"
        d="M144 189L195 42H237L290 189H253L242 156H194L183 189ZM203 127H233L218 77Z"
      />
    </g>

    <g :id="`${idBase}-cup-v`" class="java-logo__cup">
      <path :id="`${idBase}-steam-1`" class="java-logo__steam" d="M341 73C327 61 329 47 341 35C353 23 353 12 342 3" />
      <path :id="`${idBase}-steam-2`" class="java-logo__steam" d="M376 73C363 59 365 45 377 32C389 19 389 9 378 0" />
      <path :id="`${idBase}-steam-3`" class="java-logo__steam" d="M411 73C398 60 400 46 412 34C424 21 425 10 414 1" />
      <path
        :id="`${idBase}-cup-bowl`"
        class="java-logo__cup-bowl"
        fill="#5382A1"
        d="M319 94H432C429 142 410 175 375 175C340 175 322 142 319 94Z"
      />
      <path
        :id="`${idBase}-cup-rim`"
        class="java-logo__cup-rim"
        fill="#6E9BB7"
        d="M313 91C313 82 338 76 375 76C412 76 438 82 438 91C438 100 412 106 375 106C338 106 313 100 313 91Z"
      />
      <path
        :id="`${idBase}-cup-handle`"
        class="java-logo__cup-handle"
        fill="none"
        stroke="#5382A1"
        stroke-width="13"
        stroke-linecap="round"
        d="M427 112C464 108 468 146 433 153"
      />
      <path
        :id="`${idBase}-cup-accent`"
        class="java-logo__cup-accent"
        fill="#E76F00"
        d="M331 111H419C413 135 398 149 375 149C352 149 337 135 331 111Z"
      />
      <path
        :id="`${idBase}-cup-saucer`"
        class="java-logo__saucer"
        fill="#5382A1"
        d="M303 181C303 172 335 166 375 166C415 166 447 172 447 181C447 192 416 199 375 199C334 199 303 192 303 181Z"
      />
    </g>

    <g :id="`${idBase}-text-right`" class="java-logo__text-right" fill="var(--java-dark)">
      <path
        :id="`${idBase}-a-right`"
        class="java-logo__letter"
        fill-rule="evenodd"
        d="M474 189L525 42H567L620 189H583L572 156H524L513 189ZM533 127H563L548 77Z"
      />
    </g>
  </svg>
</template>

<script>
import { defineComponent } from 'vue'
import { useInView } from '../composables/useInView'

let logoCount = 0

export default defineComponent({
  name: 'JavaLogo',
  props: {
    size: { type: [Number, String], default: 280 },
    animated: { type: Boolean, default: true },
    autoplay: { type: Boolean, default: true },
    duration: { type: Number, default: 2400 },
    decorative: { type: Boolean, default: false }
  },
  setup() {
    logoCount += 1
    const { target, visible } = useInView({ threshold: 0.24, rootMargin: '0px 0px -6% 0px' })
    return { idBase: `java-logo-${logoCount}`, target, visible }
  }
})
</script>

<style scoped>
.java-logo {
  --java-blue: #5382a1;
  --java-orange: #e76f00;
  --java-dark: var(--ink);
  display: block;
  width: min(100%, 280px);
  height: auto;
  overflow: visible;
}

.java-logo__steam {
  fill: none;
  stroke: var(--java-orange);
  stroke-linecap: round;
  stroke-width: 7;
}

.java-logo__cup-handle {
  vector-effect: non-scaling-stroke;
}

.tech-logo--active .java-logo__text-left {
  animation: java-text-left 680ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.tech-logo--active .java-logo__cup-bowl,
.tech-logo--active .java-logo__cup-rim,
.tech-logo--active .java-logo__cup-handle,
.tech-logo--active .java-logo__cup-accent,
.tech-logo--active .java-logo__saucer {
  animation: java-cup-in 700ms cubic-bezier(0.22, 1, 0.36, 1) 360ms both;
}

.tech-logo--active .java-logo__steam {
  stroke-dasharray: 150;
  stroke-dashoffset: 150;
  animation: java-steam-draw 520ms ease-out both;
}

.tech-logo--active .java-logo__steam:nth-child(1) { animation-delay: 800ms; }
.tech-logo--active .java-logo__steam:nth-child(2) { animation-delay: 940ms; }
.tech-logo--active .java-logo__steam:nth-child(3) { animation-delay: 1080ms; }

.tech-logo--active .java-logo__text-right {
  animation: java-text-right 560ms cubic-bezier(0.22, 1, 0.36, 1) 1300ms both;
}

@keyframes java-text-left {
  from { opacity: 0; transform: translateX(-16px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes java-cup-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes java-steam-draw {
  from { stroke-dashoffset: 150; opacity: 0.3; }
  to { stroke-dashoffset: 0; opacity: 1; }
}

@keyframes java-text-right {
  from { opacity: 0; transform: translateX(14px); }
  to { opacity: 1; transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .tech-logo--active * {
    animation: none !important;
    transition: none !important;
  }

  .tech-logo--active .java-logo__steam {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
  }
}
</style>
