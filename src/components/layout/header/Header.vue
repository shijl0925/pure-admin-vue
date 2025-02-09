<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useLayoutStore } from '@/stores'

const layoutStore = useLayoutStore()
const { headerHeight } = storeToRefs(layoutStore)

const style = computed(() => ({
  height: `${headerHeight.value}px`,
  lineHeight: `${headerHeight.value}px`,
  paddingInline: 0,
}))
</script>

<template>
  <a-layout-header :style="style">
    <div class="h-full border-gray-100 border-b-solid bg-white px-3">
      <slot />
    </div>
  </a-layout-header>
</template>
