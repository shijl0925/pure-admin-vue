<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import { BackButton } from '@/components/button'
import { useAppStore } from '@/stores'

const {
  margin = 20,
  title = '',
} = defineProps<{
  margin?: number
  title?: string
}>()

const router = useRouter()
const appStore = useAppStore()
const { sidebarWidth } = storeToRefs(appStore)

const breakpoints = useBreakpoints(breakpointsTailwind)
const breakpointsName = ['2xl', 'xl', 'lg', 'md', 'sm'] as const

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
  <div class="m-2">
    <a-card :title="title">
      <template #extra>
        <BackButton type="text" @click="handleBack" />
      </template>
      <div class="mx-auto" :style="style">
        <slot />
      </div>
    </a-card>
  </div>
</template>
