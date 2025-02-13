<script setup lang="ts">
import type { MenuItem } from '@/types/menu'

import { Icon } from '@/components/icon'

defineOptions({
  name: 'MenuTreeItem',
})

const { item } = defineProps<{
  item: MenuItem
}>()
</script>

<template>
  <template v-if="item.children">
    <a-sub-menu :key="item.id">
      <template #icon>
        <Icon class="!text-xl" :icon="item.icon" />
      </template>
      <template #title>
        <span class="text-sm">{{ item.label }}</span>
      </template>
      <MenuTreeItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
      />
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="item.id">
      <template #icon>
        <Icon class="!text-xl" :icon="item.icon" />
      </template>
      <template #title>
        {{ item.label }}
      </template>
      <span class="text-sm">{{ item.label }}</span>
    </a-menu-item>
  </template>
</template>
