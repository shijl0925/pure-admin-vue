<script setup lang="ts">
import type { ButtonProps as AntdButtonProps } from 'ant-design-vue'

import { computed } from 'vue'

import { Icon } from '@/components/icon'

export interface ButtonProps extends AntdButtonProps {
  icon?: string
  iconPosition?: 'left' | 'right'
  loading?: boolean
}

const { icon, iconPosition = 'left', size = 'middle', loading = false, ...props } = defineProps<ButtonProps>()

const iconClass = computed(() => {
  return {
    'order-last': iconPosition === 'right',
  }
})

const space = computed(() => {
  switch (size) {
    case 'small':
      return 4
    case 'middle':
      return 8
    case 'large':
      return 12
    default:
      return 8
  }
})
</script>

<template>
  <a-button v-bind="props" :loading="loading">
    <template v-if="icon">
      <a-space v-if="$slots.default" :size="space">
        <Icon :icon="icon" :class="iconClass" />
        <slot />
      </a-space>
      <Icon v-else :icon="icon" />
    </template>
    <slot v-else />
  </a-button>
</template>
