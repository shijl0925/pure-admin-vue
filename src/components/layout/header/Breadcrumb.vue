<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { findNodePathByFlat } from '@/utils/array'

const route = useRoute()
const userStore = useUserStore()
const { flatUserMenus } = storeToRefs(userStore)

const breadcrumbItems = computed(() => {
  return findNodePathByFlat(flatUserMenus.value, menu => menu.path === route.path, {
    idKey: 'id',
    parentKey: 'parentId',
    includeTarget: true,
    reverse: false,
  })
})
</script>

<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="item in breadcrumbItems" :key="item.id">
      {{ item.title }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
