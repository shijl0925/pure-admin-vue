<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { SiderToggle, ThemeToggle } from '@/components/common'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const { headerHeight } = storeToRefs(appStore)

const style = computed(() => ({
  height: `${headerHeight.value}px`,
  lineHeight: `${headerHeight.value}px`,
  paddingInline: 0,
}))
</script>

<template>
  <a-layout-header :style="style">
    <div class="h-full flex items-center justify-between border-light-500 border-b-solid bg-white px-3 dark:border-dark-700 dark:bg-dark-800">
      <SiderToggle />
      <div class="flex items-center justify-end">
        <ThemeToggle />
      </div>
    </div>
  </a-layout-header>
</template>
