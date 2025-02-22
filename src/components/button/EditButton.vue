<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import Button from './Button.vue'

const { noText = false } = defineProps<{
  noText?: boolean
}>()

const { t } = useI18n()
</script>

<template>
  <Button icon="icon-park-outline:edit">
    {{ noText ? '' : t('common.edit') }}
  </Button>
</template>
