<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { findNodePathByFlat } from '@/utils/array'

const route = useRoute()
const userStore = useUserStore()
const { flatUserMenus, matchedMenuPath } = storeToRefs(userStore)

// 获取面包屑项
const breadcrumbItems = computed(() => {
  // 获取菜单路径
  const menuPath = findNodePathByFlat(
    flatUserMenus.value,
    menu => menu.path === matchedMenuPath.value,
  )

  // 如果当前路由比匹配到的菜单路径更长，添加额外的面包屑项
  if (route.path !== matchedMenuPath.value) {
    // 获取剩余路径
    const remainingPath = route.path.slice(matchedMenuPath.value.length)

    if (remainingPath.includes('/create')) {
      menuPath.push({
        id: -1,
        parentId: null,
        title: '新建',
        icon: '',
      })
    }
    else if (remainingPath.includes('/edit')) {
      menuPath.push({
        id: -1,
        parentId: null,
        title: '编辑',
        icon: '',
      })
    }
  }

  return menuPath
})
</script>

<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="item in breadcrumbItems" :key="item.id">
      {{ item.title }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
