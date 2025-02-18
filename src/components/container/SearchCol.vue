<script setup lang="ts">
import type { FormItemProps } from 'ant-design-vue'

const props = defineProps<FormItemProps>()
</script>

<template>
  <a-col :md="12" :lg="8" :xl="6" :xxl="4">
    <a-form-item v-bind="props">
      <slot />
    </a-form-item>
  </a-col>
</template>
