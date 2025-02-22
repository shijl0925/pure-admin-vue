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

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

function handleConfirm() {
  emit('confirm')
}
</script>

<template>
  <a-popconfirm v-bind="confirmProps" @confirm="handleConfirm">
    <Button v-bind="buttonProps">
      <slot />
    </Button>
  </a-popconfirm>
</template>
