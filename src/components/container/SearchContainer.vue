<script setup lang="ts">
import { AnimatePresence, Motion } from 'motion-v'
import { ref } from 'vue'

import { Icon } from '@/components/icon'

const isVisible = ref(false)
</script>

<template>
  <div>
    <slot />
  </div>
  <AnimatePresence>
    <Motion
      v-show="isVisible"
      class="overflow-hidden"
      :initial="{ height: 0, opacity: 0 }"
      :animate="{ height: 'auto', opacity: 1 }"
      :exit="{ height: 0, opacity: 0 }"
      :transition="{ duration: 0.2, ease: 'easeInOut' }"
    >
      <slot name="extra" />
    </Motion>
  </AnimatePresence>
  <div class="flex items-center justify-end">
    <a-space>
      <slot name="actions" />
    </a-space>
  </div>
  <div
    v-if="$slots.extra"
    class="font-base mr-4 flex grow cursor-pointer select-none items-center justify-center rounded tracking-widest transition-colors duration-300 hover:text-[#1677ff]"
    @click="isVisible = !isVisible"
  >
    <a-space>
      <Icon icon="icon-park-outline:down" class="transition-transform duration-300" :class="isVisible ? 'rotate-180' : ''" />
      <span>{{ isVisible ? '收起' : '展开' }}</span>
    </a-space>
  </div>
</template>
