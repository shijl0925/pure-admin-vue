<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { Icon } from '@/components/icon'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()
const { sidebarCollapsed } = storeToRefs(layoutStore)
const { toggleSidebarCollapsed } = layoutStore
</script>

<template>
  <a-button type="text" @click="toggleSidebarCollapsed">
    <template #icon>
      <Icon
        v-if="sidebarCollapsed"
        name="icon-park-outline:menu-unfold"
        class="text-base text-gray-800"
      />
      <Icon
        v-else
        name="icon-park-outline:menu-fold"
        class="text-base text-gray-800"
      />
    </template>
  </a-button>
</template>
