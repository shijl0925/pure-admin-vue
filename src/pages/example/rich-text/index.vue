<script setup lang="ts">
import type Quill from 'quill'

import { ref } from 'vue'

import type { ChangeEvent } from '@/components/quill'

import { BaseContainer } from '@/components/container'
import { QuillEditor } from '@/components/quill'

const text = ref('')

function handleChange(event: ChangeEvent) {
  console.log('change', event)
}

function handleBlur(quill: Quill) {
  console.log('blur', quill)
}

function handleFocus(quill: Quill) {
  console.log('focus', quill)
}

function handleReady(quill: Quill) {
  console.log('ready', quill)
}
</script>

<template>
  <BaseContainer>
    <QuillEditor
      v-model:value="text"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      @ready="handleReady"
    />
  </BaseContainer>
</template>
