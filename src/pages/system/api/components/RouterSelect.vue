<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

import { getRouterApi } from '@/apis/router'

const value = defineModel<string[]>('value')

const { data } = useQuery({
  queryKey: ['routerAll'],
  queryFn: () => getRouterApi(),
})

const options = computed(() => {
  const seen = new Set()
  return data.value?.filter((item) => {
    if (!seen.has(item.path)) {
      seen.add(item.path)
      return true
    }
    return false
  }).sort((a, b) => a.path.localeCompare(b.path)).map(item => ({
    label: item.path,
    value: item.path,
  }))
})
</script>

<template>
  <div>
    <a-select
      v-model:value="value"
      :options="options"
      allow-clear
    />
  </div>
</template>
