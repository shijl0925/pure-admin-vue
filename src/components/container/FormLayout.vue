<script setup lang="ts">
import { Button } from '@/components/button'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleBack() {
  router.back()
}
</script>

<template>
  <div class="m-2">
    <a-card>
      <template #extra>
        <Button icon="icon-park-outline:back" @click="handleBack">返回</Button>
      </template>
      <slot />
    </a-card>
  </div>
</template>
