<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { Exception } from '@/components/exception'

const { t } = useI18n()
</script>

<template>
  <Exception
    status="403"
    :title="t('page.forbidden.title')"
    :sub-title="t('page.forbidden.subTitle')"
  />
</template>
