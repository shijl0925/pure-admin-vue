<script lang="ts" setup>
import { IconButton } from '@/components/button'
import { useAnimateTheme } from '@/hooks/useAnimateTheme'

const {
  triggerRef,
  isDark,
  isLoading,
  animateToggleTheme,
} = useAnimateTheme()
</script>

<template>
  <IconButton
    ref="triggerRef"
    class="w-10"
    :icon="isDark ? 'icon-park-outline:moon' : 'icon-park-outline:sun'"
    type="text"
    block
    :disabled="isLoading"
    @click="() => animateToggleTheme()"
  />
</template>
