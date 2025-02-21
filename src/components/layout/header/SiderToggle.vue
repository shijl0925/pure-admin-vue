<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { Icon } from '@/components/icon'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const { sidebarCollapsed } = storeToRefs(appStore)
const { toggleSidebarCollapsed } = appStore

function handleClick() {
  toggleSidebarCollapsed()
}
</script>

<template>
  <div class="w-10">
    <a-button type="text" block @click="handleClick">
      <template #icon>
        <Icon
          :icon="sidebarCollapsed ? 'icon-park-outline:menu-unfold' : 'icon-park-outline:menu-fold'"
          class="text-base dark:text-theme-dark text-theme"
        />
      </template>
      <slot />
    </a-button>
  </div>
</template>
