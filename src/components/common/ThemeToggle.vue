<script lang="ts" setup>
import { Icon } from '@/components/icon'
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
  <div class="w-10">
    <a-button ref="triggerRef" type="text" block :disabled="isLoading" @click="handleClick">
      <template #icon>
        <Icon
          :icon="isDark ? 'icon-park-outline:moon' : 'icon-park-outline:sun'"
          class="text-base dark:text-theme-dark text-theme"
        />
      </template>
      <slot />
    </a-button>
  </div>
</template>
