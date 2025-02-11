import { useDark, useLocalStorage, useToggle } from '@vueuse/core'
import { theme } from 'ant-design-vue'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import {
  DEFAULT_LOCALE,
  HEADER_HEIGHT,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
} from '@/constants/app'
import { projectSign } from '@/utils/string'

export const useAppStore = defineStore('app', () => {
  // -------------------- Layout --------------------
  const headerHeight = ref(HEADER_HEIGHT)
  const sidebarWidth = ref(SIDEBAR_WIDTH)
  const sidebarCollapsedWidth = ref(SIDEBAR_COLLAPSED_WIDTH)
  const sidebarCollapsed = useLocalStorage(projectSign('sidebarCollapsed'), false)

  function toggleSidebarCollapsed() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  // -------------------- Theme --------------------
  const isDark = useDark()
  const antdTheme = computed(() => ({
    algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
  }))
  const toggleTheme = useToggle(isDark)

  // -------------------- Locale --------------------
  const locale = useLocalStorage(projectSign('locale'), DEFAULT_LOCALE)

  return {
    // Layout
    headerHeight,
    sidebarWidth,
    sidebarCollapsedWidth,
    sidebarCollapsed,
    toggleSidebarCollapsed,

    // Theme
    isDark,
    antdTheme,
    toggleTheme,

    // Locale
    locale,
  }
})
