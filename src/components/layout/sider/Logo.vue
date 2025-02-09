<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useAppStore } from '@/stores'

const router = useRouter()

const appStore = useAppStore()
const { headerHeight, sidebarCollapsed } = storeToRefs(appStore)

const logoStyle = computed(() => ({
  height: `${headerHeight.value}px`,
}))

function handleClick() {
  router.push('/')
}
</script>

<template>
  <div
    class="flex cursor-pointer select-none items-center justify-center gap-2 text-gray-800 dark:text-gray-200" :style="logoStyle" @click="() => handleClick()"
  >
    <div class="icon-local:logo text-3xl" />
    <h2
      v-show="!sidebarCollapsed"
      class="mb-0 block overflow-hidden whitespace-nowrap text-xl font-bold"
    >
      PureAdmin
    </h2>
  </div>
</template>
