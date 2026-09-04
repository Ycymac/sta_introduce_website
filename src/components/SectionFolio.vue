<template>
  <p class="section-folio" :aria-label="`${number} / ${label}`">
    <span class="section-folio__number">{{ number }}</span>
    <span class="section-folio__slash" aria-hidden="true">/</span>
    <span>{{ label }}</span>
  </p>
</template>

<script>
export default {
  name: 'SectionFolio',
  props: {
    number: { type: String, required: true },
    label: { type: String, required: true }
  }
}
</script>
