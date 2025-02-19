<script setup lang="ts">
import { BaseLayout } from '@/layouts'
</script>

<template>
  <BaseLayout>
    <RouterView v-slot="{ Component }">
      <Transition
        enter-active-class="transition-all duration-300"
        leave-active-class="transition-all duration-300"
        enter-from-class="opacity-0 -translate-x-4"
        leave-to-class="opacity-0 translate-x-4"
        mode="out-in"
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
  </BaseLayout>
</template>
