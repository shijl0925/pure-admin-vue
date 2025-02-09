import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { HEADER_HEIGHT, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '@/constants/app'
import { projectSign } from '@/utils/string'

export const useAppStore = defineStore('app', () => {
  const headerHeight = ref(HEADER_HEIGHT)
  const sidebarWidth = ref(SIDEBAR_WIDTH)
  const sidebarCollapsedWidth = ref(SIDEBAR_COLLAPSED_WIDTH)

  const sidebarCollapsed = useLocalStorage(projectSign('sidebarCollapsed'), false)

  function toggleSidebarCollapsed() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  return {
    headerHeight,
    sidebarWidth,
    sidebarCollapsedWidth,
    sidebarCollapsed,
    toggleSidebarCollapsed,
  }
})
