<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed, ref, watchEffect } from 'vue'

const { margin = 20 } = defineProps<{
  margin: number
}>()

const breakpoints = useBreakpoints(breakpointsTailwind)
const breakpointsName = ['2xl', 'xl', 'lg', 'md', 'sm'] as const

const stateSidebarWidth = 240
const statePaddingLeft = 0

function getMaxWidth() {
  const sidebarWidth = stateSidebarWidth + statePaddingLeft
  return breakpointsName.reduce((result, point, pointIndex) => {
    if (result)
      return result

    if (breakpoints[point].value) {
      return `${breakpointsTailwind[point] - sidebarWidth - margin * 2}px`
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
</script>

<template>
  <div class="mx-auto" :style="style">
    <slot />
  </div>
</template>
