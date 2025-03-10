<script setup lang="ts">
import type { IconProps } from '@iconify/vue'

import { Icon as Iconify } from '@iconify/vue'
import { nextTick, ref, watch } from 'vue'

const { icon = '', ...restProps } = defineProps<IconProps>()

const loading = ref(false)

watch(() => icon, async () => {
  loading.value = true
  await nextTick()
  loading.value = false
})
</script>

<template>
  <span v-if="loading" class="icon-wrapper" />
  <span v-else class="icon-wrapper">
    <Iconify :icon="icon" v-bind="restProps" />
  </span>
</template>
