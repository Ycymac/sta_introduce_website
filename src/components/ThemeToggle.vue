<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'"
    :aria-pressed="theme === 'dark'"
    @click="$emit('toggle')"
  >
    <span class="theme-toggle__icon" aria-hidden="true">{{ theme === 'dark' ? '☼' : '◐' }}</span>
    <span class="theme-toggle__label">{{ theme === 'dark' ? 'LIGHT' : 'DARK' }}</span>
  </button>
</template>

<script>
export default {
  name: 'ThemeToggle',
  emits: ['toggle'],
  props: {
    theme: { type: String, required: true }
  }
}
</script>
