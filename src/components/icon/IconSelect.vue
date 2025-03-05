<script lang="ts" setup>
import { listIcons } from '@iconify/vue'
import { computed } from 'vue'

import { Icon } from '@/components/icon'

const value = defineModel<string | null>('value')

const loadedIcons = listIcons()

const options = computed(() => {
  return loadedIcons.map(icon => ({
    label: icon,
    value: icon,
  }))
})

function handleChange(icon: string) {
  if (icon === undefined) {
    value.value = null
  }
}
</script>

<template>
  <a-select v-model:value="value" allow-clear show-search @change="handleChange">
    <a-select-option v-for="option in options" :key="option.value" :value="option.value">
      <a-space>
        <Icon :icon="option.value" />
        {{ option.label }}
      </a-space>
    </a-select-option>
  </a-select>
</template>
