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

  const theadRef = ref()
  const { height: tableHeaderHeight } = useElementSize(theadRef)
  function updateTableHeaderRef() {
    const header = document.querySelector('.ant-table-thead')
    if (header) {
      theadRef.value = header
    }
  }

  const tbodyRef = ref()
  const { height: tableBodyHeight } = useElementSize(tbodyRef)
  function updateTableBodyRef() {
    const body = document.querySelector('.ant-table-tbody')
    if (body) {
      tbodyRef.value = body
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

  function updateTableRef() {
    updateTableHeaderRef()
    updateTableBodyRef()
    updatePaginationRef()
  }

  useMutationObserver(document.body, updateTableRef, {
    childList: true,
    subtree: true,
  })

  const tableScroll = computed(() => {
    const offsetHeight = 6
    const scrollableTableHeight = tableCardHeight.value - tableHeaderHeight.value - paginationHeight.value - token.value.margin * 2 - offsetHeight

    return {
      x: '100%',
      y: tableBodyHeight.value >= scrollableTableHeight ? scrollableTableHeight : undefined,
    }
  })

  const listContainerProps = computed(() => ({
    searchCardRef,
    searchCardHeight,
    tableCardHeight,
  }))

  const tableProps = computed(() => ({
    bordered: true,
    sticky: true,
    scroll: tableScroll.value,
  }))

  return {
    listContainerProps,
    tableProps,
    tableBodyHeight,
  }
}
