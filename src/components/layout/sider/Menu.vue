<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { useAppStore } from '@/stores'

import MenuTreeItem from './MenuTreeItem.vue'

const appStore = useAppStore()
const { sidebarCollapsed } = storeToRefs(appStore)

const selectedKeys = ref<string[]>([])

const menuItems = [
  {
    id: 1,
    route: '/',
    icon: 'icon-park-outline:home',
    label: '首页',
  },
  {
    id: 2,
    route: '',
    icon: 'icon-park-outline:setting',
    label: '系统设置',
    children: [
      {
        id: 3,
        route: '/system/user',
        icon: 'icon-park-outline:user',
        label: '用户管理',
      },
    ],
  },
]
</script>

<template>
  <a-menu
    v-model:selected-keys="selectedKeys"
    class="!border-r-0"
    mode="inline"
    :inline-collapsed="sidebarCollapsed"
  >
    <MenuTreeItem v-for="item in menuItems" :key="item.id" :item="item" />
  </a-menu>
</template>
