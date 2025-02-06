<script setup lang="ts">
import { Icon as Iconify } from '@iconify/vue'
import { nextTick, ref, watch } from 'vue'

import styles from './Icon.module.scss'

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
  <span v-if="loading" :class="styles.icon" />
  <span v-else :class="styles.icon">
    <Iconify :icon="name" />
  </span>
</template>
