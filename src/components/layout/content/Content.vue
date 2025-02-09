<script setup lang="ts">
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useLayoutStore } from '@/stores'
import { scrollbarOptions } from '@/utils/overlayscrollbars'

const layoutStore = useLayoutStore()
const { headerHeight } = storeToRefs(layoutStore)

const contentStyle = computed(() => ({
  height: `calc(100vh - ${headerHeight.value}px)`,
}))
</script>

<template>
  <a-layout-content :style="contentStyle">
    <OverlayScrollbarsComponent :options="scrollbarOptions" defer class="h-full bg-light-300 p-4">
      <slot />
    </OverlayScrollbarsComponent>
  </a-layout-content>
</template>
