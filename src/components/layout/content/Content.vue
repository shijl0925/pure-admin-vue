<script setup lang="ts">
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useAppStore } from '@/stores'
import { scrollbarOptions } from '@/utils/overlayscrollbars'

const appStore = useAppStore()
const { headerHeight } = storeToRefs(appStore)

const contentStyle = computed(() => ({
  height: `calc(100vh - ${headerHeight.value}px)`,
}))
</script>

<template>
  <a-layout-content :style="contentStyle" class="bg-theme-content dark:bg-theme-content-dark">
    <OverlayScrollbarsComponent :options="scrollbarOptions" defer class="mx-4 h-full bg-theme-content dark:bg-theme-content-dark py-4">
      <slot />
    </OverlayScrollbarsComponent>
  </a-layout-content>
</template>
