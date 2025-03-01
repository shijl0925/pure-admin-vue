<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useAppStore } from '@/stores'
import { scrollbarOptions } from '@/utils/overlayscrollbars'

const {
  title = '',
} = defineProps<{
  title?: string
}>()

const appStore = useAppStore()
const { headerHeight } = storeToRefs(appStore)

const { height: windowHeight } = useWindowSize()

const space = computed(() => {
  const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
  return rootFontSize * 0.5 // gap-2 = 0.5rem
})

const cardHeight = computed(() => {
  return windowHeight.value - headerHeight.value - space.value * 2
})

const overlayScrollbarsHeight = computed(() => {
  return cardHeight.value - 55
})
</script>

<template>
  <div class="m-2 overflow-hidden">
    <a-card :title="title" :bordered="false" :style="{ height: `${cardHeight}px` }" :body-style="{ padding: 0 }">
      <OverlayScrollbarsComponent
        :options="scrollbarOptions"
        defer
        :style="{
          height: `${overlayScrollbarsHeight}px`,
        }"
      >
        <div class="mx-auto p-5">
          <slot />
        </div>
      </OverlayScrollbarsComponent>
    </a-card>
  </div>
</template>
