<script setup lang="ts">
import type { PopconfirmProps } from 'ant-design-vue'

import type { ButtonProps } from './Button.vue'

import Button from './Button.vue'

export interface ConfirmButtonProps {
  confirmProps?: PopconfirmProps
  buttonProps?: ButtonProps
}

const {
  confirmProps = {},
  buttonProps = {},
} = defineProps<ConfirmButtonProps>()
</script>

<template>
  <a-popconfirm v-bind="confirmProps">
    <Button v-bind="buttonProps">
      <slot />
    </Button>
  </a-popconfirm>
</template>
