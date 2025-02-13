import type { ComponentPublicInstance } from 'vue'

import { storeToRefs } from 'pinia'
import { nextTick, onMounted, ref } from 'vue'

import { useAppStore } from '@/stores'

const isBrowser = typeof window !== 'undefined'

// Inject base CSS for view transitions
function injectBaseStyles() {
  if (isBrowser) {
    const styleId = 'theme-switch-base-style'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
        ::view-transition-old(root),
        .dark::view-transition-new(root) {
          z-index: 1;
        }
        ::view-transition-new(root),
        .dark::view-transition-old(root) {
          z-index: 9999;
        }
      `
      document.head.appendChild(style)
    }
  }
}

export interface UseAnimateThemeOptions {
  duration?: number
  easing?: string
}

export function useAnimateTheme(options: UseAnimateThemeOptions = {}) {
  const {
    duration = 800,
    easing = 'ease-in-out',
  } = options

  const appStore = useAppStore()
  const { isDark } = storeToRefs(appStore)
  const { toggleTheme } = appStore

  const isLoading = ref(false)

  // Inject base styles when the hook is initialized
  onMounted(() => {
    injectBaseStyles()
  })

  const triggerRef = ref<ComponentPublicInstance>()

  const animateToggleTheme = async () => {
    if (isLoading.value)
      return

    isLoading.value = true

    if (
      !triggerRef.value
      || !(document as any).startViewTransition
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      toggleTheme()
      return
    }

    const { top, left, width, height } = triggerRef.value.$el.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))}px at ${x}px ${y}px)`,
    ]

    document.documentElement.classList.add('stop-transition')

    await document.startViewTransition(async () => {
      toggleTheme()
      await nextTick()
    }).ready

    const animation = document.documentElement.animate(
      {
        clipPath: isDark.value ? clipPath.reverse() : clipPath,
      },
      {
        duration,
        easing,
        pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
      },
    )

    animation.addEventListener('finish', () => {
      // remove stop-transition class
      // document.documentElement.classList.remove('stop-transition')
      isLoading.value = false
    }, { once: true })
  }

  return {
    triggerRef,
    isDark,
    isLoading,
    toggleTheme,
    animateToggleTheme,
  }
}
