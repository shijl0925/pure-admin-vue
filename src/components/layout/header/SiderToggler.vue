<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { Icon } from '@/components/icon'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const { sidebarCollapsed } = storeToRefs(appStore)
const { toggleSidebarCollapsed } = appStore
</script>

<template>
  <div class="w-10">
    <a-button type="text" block @click="() => toggleSidebarCollapsed()">
      <template #icon>
        <Icon
          v-show="!sidebarCollapsed"
          name="icon-park-outline:menu-fold"
          class="text-base text-gray-800 dark:text-gray-200"
        />
        <Icon
          v-show="sidebarCollapsed"
          name="icon-park-outline:menu-unfold"
          class="text-base text-gray-800 dark:text-gray-200"
        />
      </template>
    </a-button>
  </div>
</template>
