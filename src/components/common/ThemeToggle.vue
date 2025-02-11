<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { Icon } from '@/components/icon'
import { useAnimateTheme } from '@/hooks/useAnimateTheme'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const { isDark } = storeToRefs(appStore)
const { toggleTheme } = appStore

const {
  triggerRef,
  isLoading,
  animateToggleTheme,
} = useAnimateTheme({
  isDark,
  toggleTheme,
})
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
