import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { HEADER_HEIGHT, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '@/constants/layout'
import { projectSign } from '@/utils/string'

export const useLayoutStore = defineStore('layout', () => {
  const headerHeight = ref(HEADER_HEIGHT)
  const titleHeight = ref(0)
  const sidebarWidth = ref(SIDEBAR_WIDTH)
  const sidebarCollapsedWidth = ref(SIDEBAR_COLLAPSED_WIDTH)

  const sidebarCollapsed = useLocalStorage(projectSign('sidebarCollapsed'), false)

  function toggleSidebarCollapsed() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  return {
    headerHeight,
    titleHeight,
    sidebarWidth,
    sidebarCollapsedWidth,
    sidebarCollapsed,
    toggleSidebarCollapsed,
  }
})
