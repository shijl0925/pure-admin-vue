<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ConfirmButton from './ConfirmButton.vue'

const { t } = useI18n()
</script>

<template>
  <ConfirmButton
    :confirm-props="{ title: t('common.deleteConfirm') }"
    :button-props="{
      danger: true,
      icon: 'icon-park-outline:delete',
    }"
  >
    {{ t('common.delete') }}
  </ConfirmButton>
</template>
