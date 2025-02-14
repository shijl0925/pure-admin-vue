<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import type { MenuItem } from '@/types/menu'

import { flattenTree } from '@/utils/array'

import MenuTreeItem from './MenuTreeItem.vue'

const route = useRoute()

const menuItems: MenuItem[] = [
  {
    id: 1,
    parentId: null,
    route: '/',
    icon: 'icon-park-outline:home',
    label: '首页',
  },
  {
    id: 2,
    parentId: null,
    route: '',
    icon: 'icon-park-outline:setting',
    label: '系统设置',
    children: [
      {
        id: 3,
        parentId: 2,
        route: '/system/user',
        icon: 'icon-park-outline:user',
        label: '用户管理',
      },
    ],
  },
]

const flatMenuItems = flattenTree(menuItems)

const selectedKeys = computed(() => {
  return [flatMenuItems.find(item => item.route === route.path)?.id]
})

const openKeys = computed(() => {
  return [flatMenuItems.find(item => item.route === route.path)?.parentId]
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
    <MenuTreeItem v-for="item in menuItems" :key="item.id" :item="item" />
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
