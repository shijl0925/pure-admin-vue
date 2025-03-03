<script setup lang="ts">
import { message } from 'ant-design-vue'
import { ref } from 'vue'

import { BaseContainer } from '@/components/container'
import { copyToClipboard } from '@/utils/string'

const text = ref('')

async function handleCopy() {
  if (!text.value) {
    return
  }

  const success = await copyToClipboard(text.value)
  if (success) {
    message.success('复制成功')
  }
  else {
    message.error('复制失败')
  }
}
</script>

<template>
  <BaseContainer title="文本复制">
    <a-input-group compact>
      <a-input v-model:value="text" style="width: 300px" />
      <a-button type="primary" @click="handleCopy">
        复制
      </a-button>
    </a-input-group>
  </BaseContainer>
</template>
