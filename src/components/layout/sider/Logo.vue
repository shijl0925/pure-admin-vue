<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useLayoutStore } from '@/stores'

const router = useRouter()

const layoutStore = useLayoutStore()
const { headerHeight } = storeToRefs(layoutStore)

const logoStyle = computed(() => ({
  height: `${headerHeight.value}px`,
}))

function handleClick() {
  router.push('/')
}
</script>

<template>
  <div class="group flex cursor-pointer select-none items-center justify-center gap-2 text-gray-800 transition-colors duration-300" :style="logoStyle" @click="handleClick">
    <div
      class="icon-local:logo text-2xl transition-colors duration-300 group-hover:text-blue-500"
    />
    <h2 class="mb-0 block text-xl font-bold transition-colors duration-300 group-hover:text-blue-500">
      Pure Admin
    </h2>
  </div>
</template>
