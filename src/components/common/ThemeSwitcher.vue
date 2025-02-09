<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { Icon } from '@/components/icon'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const { isDark } = storeToRefs(appStore)
const { toggleDark } = appStore
</script>

<template>
  <div class="w-10">
    <a-button type="text" block @click="() => toggleDark()">
      <template #icon>
        <Icon
          v-show="!isDark"
          name="icon-park-outline:sun"
          class="text-base text-gray-800 dark:text-gray-200"
        />
        <Icon
          v-show="isDark"
          name="icon-park-outline:moon"
          class="text-base text-gray-800 dark:text-gray-200"
        />
      </template>
    </a-button>
  </div>
</template>
