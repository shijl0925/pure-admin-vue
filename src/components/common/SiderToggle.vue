<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { IconButton } from '@/components/button'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const { sidebarCollapsed } = storeToRefs(appStore)
const { toggleSidebarCollapsed } = appStore

function handleClick() {
  toggleSidebarCollapsed()
}
</script>

<template>
  <IconButton
    class="w-10"
    :icon="sidebarCollapsed ? 'icon-park-outline:menu-unfold' : 'icon-park-outline:menu-fold'"
    type="text"
    block
    @click="handleClick"
  />
</template>
