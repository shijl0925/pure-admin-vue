<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { LangSelect, SiderToggle, ThemeToggle } from '@/components/common'
import { useAppStore } from '@/stores'

import Breadcrumb from './Breadcrumb.vue'
import UserAvatar from './UserAvatar.vue'

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
    <div class="h-full flex items-center justify-between border-light-500 border-b-solid bg-theme-layout dark:bg-theme-layout-dark px-3 dark:border-dark-700">
      <div class="flex items-center gap-2">
        <SiderToggle />
        <Breadcrumb />
      </div>
      <div class="flex items-center justify-end">
        <LangSelect />
        <ThemeToggle />
        <UserAvatar />
      </div>
    </div>
  </a-layout-header>
</template>
