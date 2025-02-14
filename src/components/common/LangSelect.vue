<script setup lang="ts">
import type { MenuProps } from 'ant-design-vue'

import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { IconButton } from '@/components/button'
import { LOCALES } from '@/constants/app'
import { useAppStore } from '@/stores/app'

const { locale } = useI18n()

const appStore = useAppStore()
const { currentLocale } = storeToRefs(appStore)
const selectedKeys = computed(() => [currentLocale.value])

const menuItems = computed(() => Object.entries(LOCALES).map(([key, value]) => ({
  key,
  label: value.label,
})))

const handleClick: MenuProps['onClick'] = (e) => {
  const key = String(e.key)
  currentLocale.value = key
  locale.value = currentLocale.value
}
</script>

<template>
  <a-dropdown placement="bottom">
    <template #overlay>
      <a-menu :selected-keys="selectedKeys" :items="menuItems" @click="handleClick" />
    </template>
    <IconButton
      class="w-10"
      icon="icon-park-outline:translate"
      type="text"
      block
    />
  </a-dropdown>
</template>
