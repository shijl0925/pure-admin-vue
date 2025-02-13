<script lang="ts" setup>
import { IconButton } from '@/components/button'
import { useAnimateTheme } from '@/hooks/useAnimateTheme'

const {
  animate = true,
} = defineProps<{
  animate?: boolean
}>()

const {
  triggerRef,
  isDark,
  isLoading,
  toggleTheme,
  animateToggleTheme,
} = useAnimateTheme()

function handleClick() {
  if (animate) {
    animateToggleTheme()
  }
  else {
    toggleTheme()
  }
}
</script>

<template>
  <IconButton
    ref="triggerRef"
    class="w-10"
    :icon="isDark ? 'icon-park-outline:moon' : 'icon-park-outline:sun'"
    type="text"
    block
    :disabled="isLoading"
    @click="handleClick"
  />
</template>
