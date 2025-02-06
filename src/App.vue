<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { RouterView } from 'vue-router'
</script>

<template>
  <a-config-provider :locale="zhCN">
    <a-app>
      <RouterView />
    </a-app>
  </a-config-provider>
</template>
