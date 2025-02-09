<script setup lang="ts">
import 'overlayscrollbars/overlayscrollbars.css'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useLayoutStore } from '@/stores'
import { scrollbarOptions } from '@/utils/overlayscrollbars'

import Logo from './Logo.vue'

const layoutStore = useLayoutStore()
const {
  headerHeight,
  sidebarWidth,
  sidebarCollapsedWidth,
  sidebarCollapsed,
} = storeToRefs(layoutStore)

const menuStyle = computed(() => ({
  height: `calc(100vh - ${headerHeight.value}px)`,
}))
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
      <Logo />
      <OverlayScrollbarsComponent :options="scrollbarOptions" defer :style="menuStyle">
        <slot />
      </OverlayScrollbarsComponent>
    </div>
  </a-layout-sider>
</template>
