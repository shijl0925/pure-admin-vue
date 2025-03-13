<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { Button } from '@/components/button'
import { BaseContainer } from '@/components/container'
import { useAnimateTheme } from '@/hooks/useAnimateTheme'

const { t } = useI18n()

const {
  triggerRef,
  toggleTheme,
  animateToggleTheme,
} = useAnimateTheme()

const animate = ref(true)

function handleClick() {
  if (animate.value) {
    animateToggleTheme()
  }
  else {
    toggleTheme()
  }
}
</script>

<template>
  <BaseContainer :title="t('page.themeSwitchExample.title')">
    <div class="mb-4 flex items-center gap-2">
      <span>
        {{ t('page.themeSwitchExample.animate') }}
      </span>
      <a-switch v-model:checked="animate" />
    </div>
    <Button ref="triggerRef" @click="handleClick">
      {{ t('page.themeSwitchExample.switch') }}
    </Button>
  </BaseContainer>
</template>
