<template>
  <details ref="linearRoot" class="journey-tree2d journey-tree2d--linear" :style="journeyStyle" @toggle="onToggle">
    <summary class="journey-tree2d__summary">
      <span>
        <small>2D TREE / FULL ROUTES</small>
        <strong>展开二维旅程树</strong>
      </span>
      <span class="journey-tree2d__summary-action">{{ expanded ? '收起' : '展开' }} {{ expanded ? '−' : '+' }}</span>
    </summary>

    <div class="journey-tree2d-linear__body">
      <div class="journey-layout">
        <CohortIndex :cohorts="cohorts" :active-cohort="activeCohort" />

        <div class="journey-stage">
          <div class="journey-route__rail" aria-hidden="true">
            <span class="journey-route__rail-progress"></span>
          </div>

          <div class="journey-origin">
            <span class="journey-origin__node" aria-hidden="true"></span>
            <div>
              <p class="journey-origin__label">STA / DEPARTURE</p>
              <p>从基础、协作和持续投入开始，前往各自的下一站。</p>
            </div>
          </div>

          <section
            v-for="(cohort, cohortIndex) in cohorts"
            :id="`journey-cohort-${cohort.id}`"
            :key="cohort.id"
            class="journey-cohort"
            :data-journey-cohort="cohort.id"
            :aria-labelledby="`journey-heading-${cohort.id}`"
          >
            <div class="journey-cohort__node" aria-hidden="true"></div>
            <header class="journey-cohort__header">
              <div>
                <p class="journey-cohort__label">{{ cohort.label }}</p>
                <h3 :id="`journey-heading-${cohort.id}`">{{ cohort.phase }}</h3>
              </div>
              <p class="journey-cohort__meta">
                {{ cohort.englishPhase }}<br />{{ cohort.people.length.toString().padStart(2, '0') }}{{ cohort.isPartial ? '+' : '' }} RECORDS
              </p>
            </header>
            <p class="journey-cohort__summary">{{ cohort.summary }}</p>

            <div class="journey-records">
              <JourneyRecord
                v-for="(person, personIndex) in cohort.people"
                :key="person.id"
                :person="person"
                :serial="`${cohort.id.slice(-2)}.${(personIndex + 1).toString().padStart(2, '0')}`"
              />
              <JourneyMore v-if="cohortIndex === cohorts.length - 1" />
            </div>
          </section>
        </div>
      </div>
    </div>
  </details>
</template>

<script>
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import CohortIndex from './CohortIndex.vue'
import JourneyMore from './JourneyMore.vue'
import JourneyRecord from './JourneyRecord.vue'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default defineComponent({
  name: 'JourneyLinearTree',
  components: { CohortIndex, JourneyMore, JourneyRecord },
  props: {
    cohorts: { type: Array, default: () => [] }
  },
  setup(props) {
    const linearRoot = ref(null)
    const expanded = ref(false)
    const activeCohort = ref(props.cohorts[0] ? props.cohorts[0].id : '')
    const routeProgress = ref(0)
    let frameId = 0

    const updateJourney = () => {
      if (!expanded.value || frameId) return
      frameId = window.requestAnimationFrame(() => {
        frameId = 0
        if (!linearRoot.value) return
        const rect = linearRoot.value.getBoundingClientRect()
        const travelDistance = Math.max(rect.height - window.innerHeight * 0.32, 1)
        routeProgress.value = clamp((window.innerHeight * 0.72 - rect.top) / travelDistance, 0, 1)
        const focusLine = window.innerHeight * 0.38
        const cohortElements = Array.from(linearRoot.value.querySelectorAll('[data-journey-cohort]'))
        const passed = cohortElements.filter((element) => element.getBoundingClientRect().top <= focusLine)
        if (passed.length) activeCohort.value = passed[passed.length - 1].dataset.journeyCohort
      })
    }

    const journeyStyle = computed(() => ({ '--journey-progress': `${routeProgress.value * 100}%` }))
    const onToggle = (event) => {
      expanded.value = event.currentTarget.open
      if (expanded.value) window.requestAnimationFrame(updateJourney)
    }

    onMounted(() => {
      window.addEventListener('scroll', updateJourney, { passive: true })
      window.addEventListener('resize', updateJourney, { passive: true })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', updateJourney)
      window.removeEventListener('resize', updateJourney)
      if (frameId) window.cancelAnimationFrame(frameId)
    })

    return { activeCohort, expanded, journeyStyle, linearRoot, onToggle }
  }
})
</script>
