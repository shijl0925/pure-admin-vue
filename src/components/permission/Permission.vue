<script setup lang="ts">
import { computed } from 'vue'

import type { MatchMode } from '@/hooks/usePermission'

import { usePermission } from '@/hooks/usePermission'

const { permission, matchMode = 'all' } = defineProps<{
  permission: string | string[]
  matchMode?: MatchMode
}>()

const { hasPermission } = usePermission()

const isAuthorized = computed(() => {
  return hasPermission({
    permission,
    permissionType: 'feature',
    matchMode,
  })
})
</script>

<template>
  <div v-if="isAuthorized">
    <slot />
  </div>
</template>
