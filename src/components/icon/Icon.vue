<script setup lang="ts">
import { Icon as Iconify } from '@iconify/vue'
import { nextTick, ref, watch } from 'vue'

const { icon = '' } = defineProps<{
  icon: string
}>()

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
    <Iconify :icon="icon" />
  </span>
</template>
