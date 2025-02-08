<script lang="ts" setup>
import { useElementSize, useWindowScroll } from '@vueuse/core'
import clsx from 'clsx'
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'

import { useLayoutStore } from '@/stores'

const layoutStore = useLayoutStore()
const { headerHeight, sidebarWidth } = storeToRefs(layoutStore)
const headerRef = ref(null)
const { height } = useElementSize(headerRef)

const { y } = useWindowScroll()

watchEffect(() => {
  headerHeight.value = height.value
})

const classNames = computed(() => clsx(
  'fixed top-0 right-0 z-10 flex flex-row justify-between items-center',
  'hover:bg-white hover:shadow-xl hover:shadow-gray-300/10',
  {
    'bg-white shadow-xl shadow-gray-300/10': y.value > 0,
  },
))

const style = computed(() => ({
  left: `${sidebarWidth.value}px`,
}))
</script>

<template>
  <div ref="headerRef" :class="classNames" :style="style">
    <slot />
  </div>
</template>
