<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'

import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { antdTheme } = storeToRefs(appStore)
</script>

<template>
  <a-config-provider :locale="zhCN" :theme="antdTheme">
    <a-app>
      <RouterView />
    </a-app>
  </a-config-provider>
</template>
