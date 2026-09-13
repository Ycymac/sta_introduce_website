<template>
  <transition name="notice">
    <div v-if="notice" class="inline-notice" :data-tone="notice.tone" role="status" aria-live="polite">
      <span class="inline-notice__mark" aria-hidden="true"></span>
      <p>{{ notice.message }}</p>
      <button type="button" aria-label="关闭提示" @click="clearNotice">×</button>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from 'vue'
import { useNotice } from '@/utils/notice'

export default defineComponent({
  name: 'InlineNotice',
  setup() {
    return useNotice()
  }
})
</script>
