<script setup lang="ts">
import 'overlayscrollbars/overlayscrollbars.css'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { storeToRefs } from 'pinia'

import { useLayoutStore } from '@/stores'
import { scrollbarOptions } from '@/utils/overlayscrollbars'

const layoutStore = useLayoutStore()
const {
  sidebarWidth,
  sidebarCollapsedWidth,
  sidebarCollapsed,
} = storeToRefs(layoutStore)
</script>

<template>
  <a-layout-sider
    v-model:collapsed="sidebarCollapsed"
    collapsible
    :width="sidebarWidth"
    :collapsed-width="sidebarCollapsedWidth"
    :trigger="null"
  >
    <div class="h-full select-none bg-white shadow-md">
      <OverlayScrollbarsComponent :options="scrollbarOptions" defer>
        <slot />
      </OverlayScrollbarsComponent>
    </div>
  </a-layout-sider>
</template>
