import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useInView(options = {}) {
  const target = ref(null)
  const visible = ref(false)
  let observer

  onMounted(() => {
    if (!target.value || !window.IntersectionObserver) {
      visible.value = true
      return
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible.value = true
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px', ...options }
    )

    observer.observe(target.value)
  })

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })

  return { target, visible }
}
