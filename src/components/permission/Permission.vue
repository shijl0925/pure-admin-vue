<script setup lang="ts">
import { computed } from 'vue'

import type { PermissionMode } from '@/hooks/usePermission'

import { usePermission } from '@/hooks/usePermission'

const { permission, mode = 'all' } = defineProps<{
  permission: string | string[]
  mode?: PermissionMode
}>()

const { hasPermission } = usePermission()

const isAuthorized = computed(() => {
  return hasPermission(permission, mode)
})
</script>

<template>
  <div v-if="isAuthorized">
    <slot />
  </div>
</template>
