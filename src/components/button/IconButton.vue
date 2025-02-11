<script lang="ts" setup>
import type { ButtonProps } from 'ant-design-vue'

import { Icon } from '@/components/icon'

export interface IconButtonProps extends ButtonProps {
  icon: string
}

const {
  icon = '',
  ...props
} = defineProps<IconButtonProps>()
</script>

<template>
  <div>
    <a-button v-bind="props">
      <template #icon>
        <Icon :icon="icon" class="text-theme dark:text-theme-dark text-base" />
      </template>
      <slot />
    </a-button>
  </div>
</template>
