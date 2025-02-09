<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useLayoutStore } from '@/stores'

const router = useRouter()

const layoutStore = useLayoutStore()
const { headerHeight, sidebarCollapsed } = storeToRefs(layoutStore)

const logoStyle = computed(() => ({
  height: `${headerHeight.value}px`,
}))

function handleClick() {
  router.push('/')
}
</script>

<template>
  <div
    class="flex cursor-pointer select-none items-center justify-center gap-2 text-gray-800" :style="logoStyle" @click="handleClick"
  >
    <div class="icon-local:logo text-3xl" />
    <h2
      v-show="!sidebarCollapsed"
      class="mb-0 block overflow-hidden whitespace-nowrap text-xl font-bold"
    >
      Pure Admin
    </h2>
  </div>
</template>
