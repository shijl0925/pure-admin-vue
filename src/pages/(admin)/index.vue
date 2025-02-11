<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n<I18n>()
</script>

<template>
  <div>{{ t('common.yesOrNo.yes') }}</div>
</template>
