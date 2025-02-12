<script setup lang="ts">
import { Content, Header, Sider } from '@/components/layout'
</script>

<template>
  <a-layout>
    <Sider />
    <a-layout>
      <Header />
      <Content>
        <slot />
      </Content>
    </a-layout>
  </a-layout>
</template>
