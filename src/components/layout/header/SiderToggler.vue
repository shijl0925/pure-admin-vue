<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { Icon } from '@/components/icon'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()
const { sidebarCollapsed } = storeToRefs(layoutStore)
const { toggleSidebarCollapsed } = layoutStore
</script>

<template>
  <div class="w-10">
    <a-button type="text" block @click="toggleSidebarCollapsed">
      <template #icon>
        <Icon
          v-show="!sidebarCollapsed"
          name="icon-park-outline:menu-fold"
          class="text-base text-gray-800"
        />
        <Icon
          v-show="sidebarCollapsed"
          name="icon-park-outline:menu-unfold"
          class="text-base text-gray-800"
        />
      </template>
    </a-button>
  </div>
</template>
