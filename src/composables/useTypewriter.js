import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

export function useTypewriter(text, options = {}) {
  const displayText = ref('')
  const complete = ref(false)
  const delay = options.delay || 0
  const speed = options.speed || 80
  const reducedMotion = options.reducedMotion || ref(false)
  let timeoutId
  let intervalId

  const finish = () => {
    displayText.value = text
    complete.value = true
  }

  const start = () => {
    if (complete.value) return
    if (reducedMotion.value) {
      finish()
      return
    }

    timeoutId = window.setTimeout(() => {
      let index = 0
      intervalId = window.setInterval(() => {
        displayText.value = text.slice(0, index + 1)
        index += 1
        if (index >= text.length) {
          window.clearInterval(intervalId)
          intervalId = undefined
          complete.value = true
        }
      }, speed)
    }, delay)
  }

  if (options.autoStart !== false) onMounted(start)

  watch(reducedMotion, (value) => {
    if (value) {
      if (timeoutId) window.clearTimeout(timeoutId)
      if (intervalId) window.clearInterval(intervalId)
      finish()
    }
  })

  onBeforeUnmount(() => {
    if (timeoutId) window.clearTimeout(timeoutId)
    if (intervalId) window.clearInterval(intervalId)
  })

  return { displayText, complete, start }
}
