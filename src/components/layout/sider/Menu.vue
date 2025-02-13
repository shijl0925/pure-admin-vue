<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia'
import { h, ref } from 'vue'

import { Icon } from '@/components/icon'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const { sidebarCollapsed } = storeToRefs(appStore)

const selectedKeys = ref<string[]>([])

const menuItems = [
  {
    key: 'home',
    icon: h(Icon, { icon: 'icon-park-outline:home' }),
    label: '首页',
    title: '首页',
  },
  {
    key: 'system',
    icon: h(Icon, { icon: 'icon-park-outline:setting' }),
    label: '系统设置',
    title: '系统设置',
  },
]
</script>

<template>
  <a-menu
    v-model:selected-keys="selectedKeys"
    class="!border-r-0"
    :items="menuItems"
    mode="inline"
    :inline-collapsed="sidebarCollapsed"
  />
</template>
