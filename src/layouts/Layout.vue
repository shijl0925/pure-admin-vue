<script setup lang="ts">
import { useRoute } from 'vue-router'

import BlankLayout from './BlankLayout.vue'
import DefaultLayout from './DefaultLayout.vue'

const route = useRoute()
</script>

<template>
  <DefaultLayout v-if="!route.meta?.layout || route.meta.layout === 'default'">
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
  </DefaultLayout>
  <BlankLayout v-else>
    <RouterView />
  </BlankLayout>
</template>
