<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints, useWindowSize } from '@vueuse/core'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import { BackButton } from '@/components/button'
import { useAppStore } from '@/stores'
import { scrollbarOptions } from '@/utils/overlayscrollbars'

const {
  margin = 20,
  title = '',
  showBack = true,
} = defineProps<{
  margin?: number
  title?: string
  showBack?: boolean
}>()

const router = useRouter()
const appStore = useAppStore()
const { sidebarWidth, headerHeight } = storeToRefs(appStore)

const { height: windowHeight } = useWindowSize()

const breakpoints = useBreakpoints(breakpointsTailwind)
const breakpointsName = ['2xl', 'xl', 'lg', 'md', 'sm'] as const

const space = computed(() => {
  const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
  return rootFontSize * 0.5 // gap-2 = 0.5rem
})

const cardHeight = computed(() => {
  return windowHeight.value - headerHeight.value - space.value * 2
})

const overlayScrollbarsHeight = computed(() => {
  return cardHeight.value - 100
})

function getMaxWidth() {
  return breakpointsName.reduce((result, point, pointIndex) => {
    if (result)
      return result

    if (breakpoints[point].value) {
      return `${breakpointsTailwind[point] - sidebarWidth.value - margin * 2}px`
    }

    if (pointIndex === breakpointsName.length - 1 && !result) {
      return '100%'
    }

    return ''
  }, '')
}

const maxWidth = ref('')

watchEffect(() => {
  maxWidth.value = getMaxWidth()
}, {
  flush: 'post',
})

const style = computed(() => {
  return {
    maxWidth: maxWidth.value,
  }
})

function handleBack() {
  router.back()
}
</script>

<template>
  <div class="m-2 overflow-hidden">
    <a-card :title="title" :bordered="false" :style="{ height: `${cardHeight}px` }" :body-style="{ paddingLeft: 0, paddingRight: 0 }">
      <template v-if="showBack" #extra>
        <BackButton @click="handleBack" />
      </template>
      <OverlayScrollbarsComponent :options="scrollbarOptions" defer :style="{ height: `${overlayScrollbarsHeight}px` }">
        <div class="mx-auto" :style="style">
          <slot />
        </div>
      </OverlayScrollbarsComponent>
    </a-card>
  </div>
</template>
