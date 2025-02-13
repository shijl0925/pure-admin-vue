<script setup lang="ts">
import { ref } from 'vue'

import MenuTreeItem from './MenuTreeItem.vue'

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
