<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

import { getAllRoleApi } from '@/apis/role'

const value = defineModel<string[]>('value')

const { data } = useQuery({
  queryKey: ['roleAll'],
  queryFn: () => getAllRoleApi(),
})

const options = computed(() => {
  return data.value?.map(item => ({
    label: item.name,
    value: item.id,
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
