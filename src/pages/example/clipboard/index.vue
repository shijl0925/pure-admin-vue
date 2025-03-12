<script setup lang="ts">
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { BaseContainer } from '@/components/container'
import { copyToClipboard } from '@/utils/string'

const { t } = useI18n()

const text = ref('')

async function handleCopy() {
  if (!text.value) {
    return
  }

  const success = await copyToClipboard(text.value)
  if (success) {
    message.success(t('page.clipboardExample.copied'))
  }
  else {
    message.error(t('page.clipboardExample.copyFailed'))
  }
}
</script>

<template>
  <BaseContainer :title="t('page.clipboardExample.title')">
    <a-input-group compact>
      <a-input v-model:value="text" style="width: 300px" />
      <a-button type="primary" @click="handleCopy">
        {{ t('page.clipboardExample.copyToClipboard') }}
      </a-button>
    </a-input-group>
  </BaseContainer>
</template>
