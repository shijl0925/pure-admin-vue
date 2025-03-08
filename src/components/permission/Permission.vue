<script setup lang="ts">
import { computed } from 'vue'

import type { MatchMode } from '@/hooks/usePermission'

import { MENU_TYPE } from '@/constants/menu'
import { usePermission } from '@/hooks/usePermission'

const { permission, matchMode = 'all' } = defineProps<{
  permission: string | string[]
  matchMode?: MatchMode
}>()

const { hasPermission } = usePermission()

const isAuthorized = computed(() => {
  return hasPermission({
    permission,
    permissionType: MENU_TYPE.FEATURE,
    matchMode,
  })
})
</script>

<template>
  <span v-if="isAuthorized">
    <slot />
  </span>
</template>
