<script setup lang="ts">
import type { Ref } from 'vue'

import { toRef } from 'vue'

const props = defineProps<{
  searchCardRef: Ref<HTMLElement>
  tableCardHeight: Ref<number>
}>()

const tableCardHeight = toRef(props, 'tableCardHeight')
</script>

<template>
  <div class="m-2 flex flex-col items-stretch gap-2 overflow-hidden lt-sm:overflow-auto">
    <a-card :ref="props.searchCardRef" size="small" :bordered="false">
      <slot name="searchForm" />
    </a-card>
    <a-card :style="{ height: `${tableCardHeight}px` }" size="small" :bordered="false">
      <slot />
    </a-card>
  </div>
</template>
