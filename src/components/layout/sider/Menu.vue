<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useUserStore } from '@/stores/user'

import MenuTreeItem from './MenuTreeItem.vue'

const route = useRoute()
const userStore = useUserStore()
const { userMenus, flatUserMenus } = storeToRefs(userStore)

const selectedKeys = computed(() => {
  return [flatUserMenus.value.find(item => item.path === route.path)?.id]
})

const openKeys = computed(() => {
  return [flatUserMenus.value.find(item => item.path === route.path)?.parentId]
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
