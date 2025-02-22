<script setup lang="ts">
import type { ButtonProps } from 'ant-design-vue'

import { useI18n } from 'vue-i18n'

import ConfirmButton from './ConfirmButton.vue'

const {
  noText = false,
  loading = false,
  disabled = false,
  size = 'middle',
  type = 'default',
  count,
} = defineProps<{
  noText?: boolean
  loading?: boolean
  disabled?: boolean
  size?: ButtonProps['size']
  type?: ButtonProps['type']
  count: number
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const { t } = useI18n()

function handleConfirm() {
  emit('confirm')
}
</script>

<template>
  <ConfirmButton
    :confirm-props="{
      title: t('common.batchDelete'),
      description: t('common.batchDeleteConfirm', { count }),
      placement: 'topRight',
    }"
    :button-props="{
      danger: true,
      icon: 'icon-park-outline:delete',
      loading,
      disabled,
      size,
      type,
    }"
    @confirm="handleConfirm"
  >
    {{ noText ? '' : t('common.batchDelete') }}
  </ConfirmButton>
</template>
