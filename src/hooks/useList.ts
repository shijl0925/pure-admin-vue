import { useElementSize, useMutationObserver, useWindowSize } from '@vueuse/core'
import { theme } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import { useAppStore } from '@/stores'

export function useList() {
  const { token } = theme.useToken()
  const { height: windowHeight } = useWindowSize()

  const appStore = useAppStore()
  const { headerHeight } = storeToRefs(appStore)

  const searchCardRef = ref()
  const { height: searchCardHeight } = useElementSize(searchCardRef)
  const space = computed(() => {
    const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
    return rootFontSize * 0.5 // gap-2 = 0.5rem
  })
  const tableCardHeight = computed(() => {
    return windowHeight.value - headerHeight.value - searchCardHeight.value - space.value * 3
  })

  const tableHeaderRef = ref()
  const { height: tableHeaderHeight } = useElementSize(tableHeaderRef)
  function updateTableHeaderRef() {
    const header = document.querySelector('.ant-table-thead')
    if (header) {
      tableHeaderRef.value = header
    }
  }

  const paginationRef = ref()
  const { height: paginationHeight } = useElementSize(paginationRef)
  function updatePaginationRef() {
    const pagination = document.querySelector('.ant-table-pagination')
    if (pagination) {
      paginationRef.value = pagination
    }
  }

  function updateAllRef() {
    updateTableHeaderRef()
    updatePaginationRef()
  }

  useMutationObserver(document.body, updateAllRef, {
    childList: true,
    subtree: true,
  })

  const tableScroll = computed(() => ({
    x: '100%',
    y: tableCardHeight.value - tableHeaderHeight.value - paginationHeight.value - token.value.marginXL,
  }))

  const listContainerProps = computed(() => ({
    searchCardRef,
    searchCardHeight,
    tableCardHeight,
  }))

  const tableProps = computed(() => ({
    scroll: tableScroll.value,
  }))

  return {
    listContainerProps,
    tableProps,
  }
}
