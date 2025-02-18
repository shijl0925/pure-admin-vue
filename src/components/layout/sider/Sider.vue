<script setup lang="ts">
import 'overlayscrollbars/overlayscrollbars.css'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useAppStore } from '@/stores'
import { scrollbarOptions } from '@/utils/overlayscrollbars'

import Logo from './Logo.vue'
import Menu from './Menu.vue'

const appStore = useAppStore()
const {
  headerHeight,
  sidebarWidth,
  sidebarCollapsedWidth,
  sidebarCollapsed,
} = storeToRefs(appStore)

const menuStyle = computed(() => ({
  height: `calc(100vh - ${headerHeight.value}px)`,
}))
</script>

<template>
  <a-layout-sider
    v-model:collapsed="sidebarCollapsed"
    class="z-1"
    collapsible
    :width="sidebarWidth"
    :collapsed-width="sidebarCollapsedWidth"
    :trigger="null"
  >
    <div class="h-full select-none border-r border-r-light-200 border-r-solid bg-theme-layout shadow-md dark:border-r-dark-900 dark:bg-[#141414]">
      <Logo />
      <OverlayScrollbarsComponent :options="scrollbarOptions" defer :style="menuStyle">
        <Menu />
      </OverlayScrollbarsComponent>
    </div>
  </a-layout-sider>
</template>
