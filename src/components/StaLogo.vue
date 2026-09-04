<template>
  <!--
    The original production paths are not available in this repository yet.
    The stable S, T, and language-built A retain the reference structure; Chinese and
    arc lettering remain an explicit structural approximation until traced paths
    can be supplied. This component is intentionally ready for that asset swap.
  -->
  <svg
    :class="[
      'sta-logo',
      `sta-logo--${variant}`,
      { 'sta-logo--animated': animated, 'sta-logo--paused': !autoplay }
    ]"
    :style="{ '--sta-duration': `${duration}ms` }"
    viewBox="0 0 635 635"
    :width="size"
    :height="size"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    :role="decorative ? undefined : 'img'"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-labelledby="decorative ? undefined : `${idBase}-title ${idBase}-desc`"
  >
    <title v-if="!decorative" :id="`${idBase}-title`">西安邮电大学软件科技协会标志</title>
    <desc v-if="!decorative" :id="`${idBase}-desc`">
      Software and Technology Association logo, represented by a circular mark,
      blue S and T forms, and a red programming-language A.
    </desc>

    <defs :id="`${idBase}-defs`">
      <path :id="`${idBase}-english-arc`" d="M 126 276 A 188 188 0 0 1 495 276" />
    </defs>

    <g :id="`${idBase}-outer-ring`" class="sta-logo__ring">
      <circle
        :id="`${idBase}-outer-ring-circle`"
        class="sta-logo__ring-circle"
        cx="310.5"
        cy="310"
        r="216.5"
        fill="none"
        stroke="var(--logo-primary)"
        stroke-width="10"
        stroke-linecap="round"
      />
    </g>

    <g :id="`${idBase}-english-title`" class="sta-logo__english">
      <text
        fill="var(--logo-primary)"
        font-size="31"
        font-weight="600"
        text-anchor="middle"
        letter-spacing="-0.35"
      >
        <textPath :href="`#${idBase}-english-arc`" startOffset="50%">
          Software and Technology Association
        </textPath>
      </text>
    </g>

    <g :id="`${idBase}-sta-core`" class="sta-logo__core" fill="var(--logo-primary)">
      <text
        :id="`${idBase}-sta-s`"
        class="sta-logo__s"
        x="164"
        y="359"
      >S</text>
      <path
        :id="`${idBase}-sta-t`"
        d="M197 229H447V246H326V356H303V246H197Z"
      />
    </g>

    <g :id="`${idBase}-language-a`" class="sta-logo__language-a" fill="var(--logo-red)">
      <g class="sta-logo__language-row" :id="`${idBase}-lang-row-1`">
        <text x="369" y="264">Objective-C</text>
      </g>
      <g class="sta-logo__language-row" :id="`${idBase}-lang-row-2`">
        <text x="362" y="276">C++</text><text x="411" y="276">php</text>
      </g>
      <g class="sta-logo__language-row" :id="`${idBase}-lang-row-3`">
        <text x="360" y="288">C</text><text x="414" y="288">VB</text>
      </g>
      <g class="sta-logo__language-row" :id="`${idBase}-lang-row-4`">
        <text x="377" y="300">python</text><text x="414" y="300">java</text>
      </g>
      <g class="sta-logo__language-row" :id="`${idBase}-lang-row-5`">
        <text x="360" y="312">Basic</text><text x="416" y="312">Lua</text>
      </g>
      <g class="sta-logo__language-row" :id="`${idBase}-lang-row-6`">
        <text x="356" y="324">Ada</text><text x="421" y="324">c#</text>
      </g>
      <g class="sta-logo__language-row" :id="`${idBase}-lang-row-7`">
        <text x="355" y="336">Perl</text><text x="416" y="336">Lisp</text>
      </g>
      <g class="sta-logo__language-row" :id="`${idBase}-lang-row-8`">
        <text x="361" y="348">javascript</text><text x="414" y="348">Pascal</text>
      </g>
      <g class="sta-logo__language-row" :id="`${idBase}-lang-row-9`">
        <text x="372" y="360">ruby</text><text x="420" y="360">Logo</text>
      </g>
    </g>

    <g :id="`${idBase}-cn-school`" class="sta-logo__cn-school" fill="var(--logo-primary)">
      <text x="178" y="438" letter-spacing="13">西安邮电大学</text>
    </g>

    <g :id="`${idBase}-cn-association`" class="sta-logo__cn-association" fill="var(--logo-primary)">
      <text x="216" y="486" letter-spacing="8">软件科技协会</text>
    </g>
  </svg>
</template>

<script>
import { defineComponent } from 'vue'

let logoCount = 0

export default defineComponent({
  name: 'StaLogo',
  props: {
    size: { type: [Number, String], default: 320 },
    variant: { type: String, default: 'brand' },
    animated: { type: Boolean, default: false },
    duration: { type: Number, default: 2800 },
    autoplay: { type: Boolean, default: true },
    decorative: { type: Boolean, default: false }
  },
  setup() {
    logoCount += 1
    return { idBase: `sta-logo-${logoCount}` }
  }
})
</script>

<style scoped>
.sta-logo {
  --logo-primary: #002f63;
  --logo-red: #fb2026;
  --sta-duration: 2800ms;
  display: block;
  overflow: visible;
  max-width: 100%;
  height: auto;
}

.sta-logo--ambient {
  --logo-primary: #002f63;
}

.sta-logo__english,
.sta-logo__cn-school,
.sta-logo__cn-association,
.sta-logo__core,
.sta-logo__language-a {
  transform-box: fill-box;
  transform-origin: center;
}

.sta-logo__english text {
  font-family: 'Arial Rounded MT Bold', 'Trebuchet MS', Arial, sans-serif;
}

.sta-logo__language-a text {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  font-weight: 700;
}

.sta-logo__s {
  font-family: 'Space Grotesk', Arial, Helvetica, sans-serif;
  font-size: 176px;
  font-weight: 700;
  letter-spacing: -0.06em;
}

.sta-logo__cn-school text,
.sta-logo__cn-association text {
  font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-weight: 700;
}

.sta-logo--animated .sta-logo__ring-circle {
  stroke-dasharray: 1360.3;
  stroke-dashoffset: 1360.3;
  animation: sta-ring-draw 700ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.sta-logo--animated .sta-logo__english {
  opacity: 0;
  animation: sta-english-in 600ms ease-out 350ms forwards;
}

.sta-logo--animated .sta-logo__core {
  opacity: 0;
  animation: sta-core-in 520ms cubic-bezier(0.22, 1, 0.36, 1) 700ms forwards;
}

.sta-logo--animated .sta-logo__language-row {
  opacity: 0;
  animation: sta-language-in 220ms ease-out forwards;
}

.sta-logo--animated .sta-logo__language-row:nth-child(1) { animation-delay: 1150ms; }
.sta-logo--animated .sta-logo__language-row:nth-child(2) { animation-delay: 1220ms; }
.sta-logo--animated .sta-logo__language-row:nth-child(3) { animation-delay: 1290ms; }
.sta-logo--animated .sta-logo__language-row:nth-child(4) { animation-delay: 1360ms; }
.sta-logo--animated .sta-logo__language-row:nth-child(5) { animation-delay: 1430ms; }
.sta-logo--animated .sta-logo__language-row:nth-child(6) { animation-delay: 1500ms; }
.sta-logo--animated .sta-logo__language-row:nth-child(7) { animation-delay: 1570ms; }
.sta-logo--animated .sta-logo__language-row:nth-child(8) { animation-delay: 1640ms; }
.sta-logo--animated .sta-logo__language-row:nth-child(9) { animation-delay: 1710ms; }

.sta-logo--animated .sta-logo__cn-school {
  opacity: 0;
  animation: sta-cn-in 500ms ease-out 1550ms forwards;
}

.sta-logo--animated .sta-logo__cn-association {
  opacity: 0;
  animation: sta-cn-in 500ms ease-out 2050ms forwards;
}

.sta-logo--paused * {
  animation-play-state: paused !important;
}

@keyframes sta-ring-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes sta-english-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes sta-core-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes sta-language-in {
  from { opacity: 0; transform: translateY(-3px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes sta-cn-in {
  from { opacity: 0; transform: translateY(3px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .sta-logo--animated * {
    animation: none !important;
    transition: none !important;
  }

  .sta-logo--animated .sta-logo__ring-circle {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
  }

  .sta-logo--animated .sta-logo__english,
  .sta-logo--animated .sta-logo__core,
  .sta-logo--animated .sta-logo__language-row,
  .sta-logo--animated .sta-logo__cn-school,
  .sta-logo--animated .sta-logo__cn-association {
    opacity: 1;
    transform: none;
  }
}
</style>
