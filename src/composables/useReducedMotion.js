import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useReducedMotion() {
  const reducedMotion = ref(false)
  let mediaQuery

  const update = () => {
    reducedMotion.value = Boolean(mediaQuery && mediaQuery.matches)
  }

  onMounted(() => {
    if (!window.matchMedia) return

    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    update()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', update)
    } else {
      mediaQuery.addListener(update)
    }
  })

  onBeforeUnmount(() => {
    if (!mediaQuery) return

    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', update)
    } else {
      mediaQuery.removeListener(update)
    }
  })

  return { reducedMotion }
}
