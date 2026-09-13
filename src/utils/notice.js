import { readonly, ref } from 'vue'

const notice = ref(null)
let timer = null

export function useNotice() {
  const showNotice = (message, tone = 'info', duration = 3600) => {
    if (timer) window.clearTimeout(timer)
    notice.value = { id: Date.now(), message, tone }
    timer = window.setTimeout(() => {
      notice.value = null
      timer = null
    }, duration)
  }

  const clearNotice = () => {
    if (timer) window.clearTimeout(timer)
    timer = null
    notice.value = null
  }

  return { notice: readonly(notice), showNotice, clearNotice }
}
