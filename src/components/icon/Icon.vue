<script setup lang="ts">
import { Icon as Iconify } from '@iconify/vue'
import { nextTick, ref, watch } from 'vue'

const { name = '' } = defineProps<{
  name: string
}>()

const loading = ref(false)

watch(() => name, async () => {
  loading.value = true
  await nextTick()
  loading.value = false
})
</script>

<template>
  <span v-if="loading" class="icon-wrapper" />
  <span v-else class="icon-wrapper">
    <Iconify :icon="name" />
  </span>
</template>
