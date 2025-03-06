<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { FormContainer } from '@/components/container'
import { usePageTransfer } from '@/hooks/usePageTransfer'

const { t } = useI18n()

const { getTransferredData } = usePageTransfer()

const data = getTransferredData()
</script>

<template>
  <FormContainer :title="t('page.pageTransferExample.transferred')" :show-back="false">
    {{ data }}
  </FormContainer>
</template>
