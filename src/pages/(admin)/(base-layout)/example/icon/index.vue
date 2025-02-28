<script setup lang="ts">
import { listIcons } from '@iconify/vue'
import { message } from 'ant-design-vue'

import { BaseContainer } from '@/components/container'
import { Icon } from '@/components/icon'
import { copyToClipboard } from '@/utils/string'

const loadedIcons = listIcons()

async function handleClickIcon(icon: string) {
  const success = await copyToClipboard(icon)
  if (success) {
    message.success('复制成功')
  }
  else {
    message.error('复制失败')
  }
}
</script>

<template>
  <BaseContainer title="图标列表">
    <div class="grid grid-cols-2 gap-4 2xl:grid-cols-18 lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-4 xl:grid-cols-14">
      <div
        v-for="icon in loadedIcons"
        :key="icon"
        class="aspect-square flex flex-col cursor-pointer items-center justify-center gap-4 border border-gray-200 rounded-md border-solid p-2 hover:bg-gray-100"
        @click="handleClickIcon(icon)"
      >
        <Icon class="text-2xl" :icon="icon" />
      </div>
    </div>
  </BaseContainer>
</template>
