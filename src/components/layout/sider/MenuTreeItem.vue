<script setup lang="ts">
import { useRouter } from 'vue-router'

import type { MenuItem } from '@/types/menu'

import { Icon } from '@/components/icon'

defineOptions({
  name: 'MenuTreeItem',
})

const { item } = defineProps<{
  item: MenuItem
}>()

const router = useRouter()

function handleClick(item: MenuItem) {
  if (item.path) {
    router.push(item.path)
  }
}
</script>

<template>
  <template v-if="item.children">
    <a-sub-menu :key="item.id">
      <template #icon>
        <Icon class="!text-xl" :icon="item.icon" />
      </template>
      <template #title>
        <span class="text-sm">{{ item.title }}</span>
      </template>
      <MenuTreeItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
      />
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="item.id" @click="handleClick(item)">
      <template #icon>
        <Icon class="!text-xl" :icon="item.icon" />
      </template>
      <template v-if="!item.parentId" #title>
        {{ item.title }}
      </template>
      <span class="text-sm">{{ item.title }}</span>
    </a-menu-item>
  </template>
</template>
