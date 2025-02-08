import { defineStore } from 'pinia'
import { ref } from 'vue'

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '@/constants/layout'

export const useLayoutStore = defineStore('layout', () => {
  const headerHeight = ref(HEADER_HEIGHT)
  const titleHeight = ref(0)
  const sidebarWidth = ref(SIDEBAR_WIDTH)
  const sidebarVisible = ref(true)

  return {
    headerHeight,
    titleHeight,
    sidebarWidth,
    sidebarVisible,
  }
})
