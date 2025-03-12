<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { Exception } from '@/components/exception'

const { t } = useI18n()
</script>

<template>
  <Exception
    status="500"
    :title="t('page.serverError.title')"
    :sub-title="t('page.serverError.subTitle')"
  />
</template>
