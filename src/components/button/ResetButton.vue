<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import Button from './Button.vue'

const { t } = useI18n()
</script>

<template>
  <Button icon="icon-park-outline:undo">
    {{ t('common.reset') }}
  </Button>
</template>
