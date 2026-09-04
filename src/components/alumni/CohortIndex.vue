<template>
  <nav class="cohort-index" aria-label="校友届次导航">
    <p class="cohort-index__label">JOURNEY<br />INDEX</p>
    <ol class="cohort-index__list">
      <li v-for="cohort in cohorts" :key="cohort.id">
        <a
          class="cohort-index__link"
          :class="{ 'is-active': activeCohort === cohort.id }"
          :href="`#journey-cohort-${cohort.id}`"
          :aria-current="activeCohort === cohort.id ? 'step' : undefined"
        >
          <span>{{ cohort.label }}</span>
          <small>{{ cohort.people.length.toString().padStart(2, '0') }}{{ cohort.isPartial ? '+' : '' }}</small>
        </a>
      </li>
    </ol>
    <span class="cohort-index__rule" aria-hidden="true"></span>
    <p class="cohort-index__caption">SCROLL<br />TO TRACE</p>
  </nav>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CohortIndex',
  props: {
    cohorts: { type: Array, default: () => [] },
    activeCohort: { type: String, default: '' }
  }
})
</script>
