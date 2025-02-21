<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useUserStore } from '@/stores/userStore'

import MenuTreeItem from './MenuTreeItem.vue'

const userStore = useUserStore()
const { userMenus, flatUserMenus, matchedMenuPath } = storeToRefs(userStore)

const selectedKeys = computed(() => {
  return [flatUserMenus.value.find(item => item.path === matchedMenuPath.value)?.id]
})

const openKeys = computed(() => {
  return [flatUserMenus.value.find(item => item.path === matchedMenuPath.value)?.parentId]
})
</script>

<template>
  <a-menu
    :selected-keys="selectedKeys"
    :open-keys="openKeys"
    :class="$style.menuWrapper"
    class="!border-r-0"
    mode="inline"
  >
    <MenuTreeItem v-for="item in userMenus" :key="item.id" :item="item" />
  </a-menu>
</template>

<style module lang="scss">
.menuWrapper {
  :global {
    .ant-menu-inline {
      background-color: transparent !important;
    }
  }
}
</style>
