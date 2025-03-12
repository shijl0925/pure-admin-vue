<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { Exception } from '@/components/exception'

const { t } = useI18n()
</script>

<template>
  <Exception
    status="404"
    :title="t('page.notFound.title')"
    :sub-title="t('page.notFound.subTitle')"
  />
</template>
