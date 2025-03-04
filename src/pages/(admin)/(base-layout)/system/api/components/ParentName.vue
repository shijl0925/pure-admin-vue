<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { isNil } from 'es-toolkit'
import { computed } from 'vue'

import { getFlatApiApi } from '@/apis/api'

const { value } = defineProps<{
  value: number | null
}>()

const { data: flatApi } = useQuery({
  queryKey: ['flatApi'],
  queryFn: getFlatApiApi,
})

const parentName = computed(() => {
  if (isNil(value)) {
    return '顶层'
  }
  return flatApi.value?.find(api => api.id === value)?.title
})
</script>

<template>
  <a-input :value="parentName" disabled />
</template>
