<script setup lang="ts">
import type { ButtonProps } from 'ant-design-vue'

import { useI18n } from 'vue-i18n'

import ConfirmButton from './ConfirmButton.vue'

const {
  noText = false,
  loading = false,
  size = 'middle',
  type = 'default',
} = defineProps<{
  noText?: boolean
  loading?: boolean
  size?: 'small' | 'middle' | 'large'
  type?: ButtonProps['type']
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
      title: t('common.delete'),
      description: t('common.deleteConfirm'),
      placement: 'topRight',
    }"
    :button-props="{
      danger: true,
      icon: 'icon-park-outline:delete',
      loading,
      size,
      type,
    }"
    @confirm="handleConfirm"
  >
    {{ noText ? '' : t('common.delete') }}
  </ConfirmButton>
</template>
