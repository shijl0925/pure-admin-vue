<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { MENU_TYPE } from '@/constants/menu'
import { useUserStore } from '@/stores/userStore'
import { findNodePathByFlat } from '@/utils/array'

const route = useRoute()
const { t } = useI18n()
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
        title: t('common.create'),
        icon: '',
        type: MENU_TYPE.MENU,
      })
    }
    else if (remainingPath.includes('/edit')) {
      menuPath.push({
        id: -1,
        parentId: null,
        title: t('common.edit'),
        icon: '',
        type: MENU_TYPE.MENU,
      })
    }
  }

  return menuPath
})
</script>

<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="item in breadcrumbItems" :key="item.id">
      <template v-if="item.path && item.path !== route.path">
        <RouterLink :to="item.path">
          {{ item.i18nKey ? t(item.i18nKey) : item.title }}
        </RouterLink>
      </template>
      <template v-else>
        {{ item.i18nKey ? t(item.i18nKey) : item.title }}
      </template>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
