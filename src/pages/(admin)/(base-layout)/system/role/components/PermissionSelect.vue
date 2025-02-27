<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

import { getMenuPermissionApi } from '@/apis/menu'

const { type } = defineProps<{
  type: 'MENU' | 'UI'
}>()

const value = defineModel<string[]>('value')

const { data } = useQuery({
  queryKey: ['menuPermission', type],
  queryFn: () => getMenuPermissionApi(type),
})

const options = computed(() => {
  return data.value?.map(item => ({
    label: item.title,
    value: item.code,
  }))
})
</script>

<template>
  <div>
    <a-select
      v-model:value="value"
      :options="options"
      mode="multiple"
      allow-clear
    />
  </div>
</template>
