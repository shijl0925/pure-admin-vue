<script lang="ts" setup>
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import 'overlayscrollbars/overlayscrollbars.css'
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'

import { useLayoutStore } from '@/stores'
import { scrollbarOptions } from '@/utils/overlayscrollbars'

const { width = 240 } = defineProps<{
  width: number
}>()
const layoutStore = useLayoutStore()
const {
  headerHeight,
  titleHeight,
  sidebarWidth,
  sidebarVisible,
} = storeToRefs(layoutStore)

const sidebarRef = ref(null)

const miniSidebarWidth = 20

watchEffect(() => {
  if (sidebarVisible.value) {
    sidebarWidth.value = width
  }
  else {
    sidebarWidth.value = miniSidebarWidth
  }
})

const style = computed(() => ({
  width: `${width}px`,
  paddingTop: `${headerHeight.value || titleHeight.value}px`,
}))

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value
}
</script>

<template>
  <div
    v-if="sidebarVisible"
    ref="sidebarRef"
    class="fixed inset-y-0 z-10 flex flex-col cursor-pointer select-none border-r border-gray-200 bg-white shadow-md"
    :style="style"
  >
    <OverlayScrollbarsComponent :options="scrollbarOptions" defer class="grow">
      <slot />
    </OverlayScrollbarsComponent>
    <div class="h-16 flex shrink-0 grow-0 flex-row items-center border-t border-gray-100 pl-6 text-gray-500 space-x-1 hover:bg-gray-50" @click="() => toggleSidebar()">
      <span class="text-lg">
        <common-icon name="icon-park-outline:menu-unfold-one" />
      </span>
      <span class="text-sm">隐藏侧边栏</span>
    </div>
  </div>
  <a-tooltip v-else placement="right">
    <template #title>
      展开侧边栏
    </template>
    <div
      class="fixed inset-y-0 z-10 flex cursor-pointer select-none items-center justify-center border-r border-gray-200 bg-white text-gray-600 shadow-xl hover:bg-gray-100"
      :style="{
        width: `${miniSidebarWidth}px`,
      }"
      @click="() => toggleSidebar()"
    >
      <common-icon name="icon-park-outline:right" />
    </div>
  </a-tooltip>
</template>
