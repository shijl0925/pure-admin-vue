<script lang="ts" setup>
import { Icon } from '@/components/icon'
import { useAnimateTheme } from '@/hooks/useAnimateTheme'

const {
  triggerRef,
  isDark,
  isLoading,
  animateToggleTheme,
} = useAnimateTheme()
</script>

<template>
  <div class="w-10">
    <a-button
      ref="triggerRef"
      :disabled="isLoading"
      type="text"
      block
      @click="() => animateToggleTheme()"
    >
      <template #icon>
        <Icon
          v-show="!isDark"
          name="icon-park-outline:sun"
          class="text-base text-gray-800 dark:text-gray-200"
        />
        <Icon
          v-show="isDark"
          name="icon-park-outline:moon"
          class="text-base text-gray-800 dark:text-gray-200"
        />
      </template>
    </a-button>
  </div>
</template>
